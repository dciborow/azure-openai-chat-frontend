import React, { useState, useEffect } from 'react';
import { getAPIResponse } from '../core/http';
import { parseStreamedMessages } from '../core/parser';
import { globalConfig } from '../config/globalConfig';
import { chatEntryToString, newListWithEntryAtIndex } from '../utils';

const ChatController = ({ host }) => {
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);
  const [processingMessage, setProcessingMessage] = useState(undefined);
  const [abortController, setAbortController] = useState(new AbortController());

  const clear = () => {
    setIsAwaitingResponse(false);
    setIsProcessingResponse(false);
    setGeneratingAnswer(false);
  };

  const reset = () => {
    setProcessingMessage(undefined);
    clear();
  };

  const processResponse = async (response, isUserMessage = false, useStream = false) => {
    const citations = [];
    const followingSteps = [];
    const followupQuestions = [];
    const timestamp = new Date().toISOString();
    let thoughts;
    let dataPoints;

    const updateChatWithMessageOrChunk = async (message, chunked) => {
      setProcessingMessage({
        id: crypto.randomUUID(),
        text: [
          {
            value: chunked ? '' : message,
            followingSteps,
          },
        ],
        followupQuestions,
        citations: [...new Set(citations)],
        timestamp,
        isUserMessage,
        thoughts,
        dataPoints,
      });

      if (chunked && processingMessage) {
        setIsProcessingResponse(true);
        setAbortController(new AbortController());

        await parseStreamedMessages({
          chatEntry: processingMessage,
          signal: abortController.signal,
          apiResponseBody: message.body,
          onChunkRead: (updated) => {
            setProcessingMessage(updated);
          },
          onCancel: () => {
            clear();
          },
        });

        clear();
      }
    };

    if (isUserMessage || typeof response === 'string') {
      await updateChatWithMessageOrChunk(response, false);
    } else if (useStream) {
      await updateChatWithMessageOrChunk(response, true);
    } else {
      const generatedResponse = response.choices[0].message;
      const processedText = processText(generatedResponse.content, [citations, followingSteps, followupQuestions]);
      const messageToUpdate = processedText.replacedText;
      citations.push(...processedText.arrays[0]);
      followingSteps.push(...processedText.arrays[1]);
      followupQuestions.push(...processedText.arrays[2]);
      thoughts = generatedResponse.context?.thoughts ?? '';
      dataPoints = generatedResponse.context?.data_points ?? [];

      await updateChatWithMessageOrChunk(messageToUpdate, false);
    }
  };

  const generateAnswer = async (requestOptions, httpOptions) => {
    const { question } = requestOptions;

    if (question) {
      try {
        setGeneratingAnswer(true);

        if (requestOptions.type === 'chat') {
          await processResponse(question, true, false);
        }

        setIsAwaitingResponse(true);
        setProcessingMessage(undefined);

        const response = await getAPIResponse(requestOptions, httpOptions);
        setIsAwaitingResponse(false);

        await processResponse(response, false, httpOptions.stream);
      } catch (error) {
        const chatError = {
          message: error?.code === 400 ? globalConfig.INVALID_REQUEST_ERROR : globalConfig.API_ERROR_MESSAGE,
        };

        if (!processingMessage) {
          await processResponse('', false, false);
        }

        if (processingMessage) {
          setProcessingMessage({
            ...processingMessage,
            error: chatError,
          });
        }
      } finally {
        clear();
      }
    }
  };

  const cancelRequest = () => {
    abortController.abort();
  };

  return {
    generatingAnswer,
    isAwaitingResponse,
    isProcessingResponse,
    processingMessage,
    generateAnswer,
    cancelRequest,
    reset,
  };
};

export default ChatController;
