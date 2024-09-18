import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { chatHttpOptions, globalConfig, teaserListTexts, requestOptions, MAX_CHAT_HISTORY } from '../config/globalConfig';
import { chatStyle } from '../styles/chatComponent';
import { chatEntryToString, newListWithEntryAtIndex } from '../utils';
import iconLightBulb from '../svg/lightbulb-icon.svg?raw';
import iconDelete from '../svg/delete-icon.svg?raw';
import iconCancel from '../svg/cancel-icon.svg?raw';
import iconSend from '../svg/send-icon.svg?raw';
import iconClose from '../svg/close-icon.svg?raw';
import iconLogo from '../svg/branding/brand-logo.svg?raw';
import iconUp from '../svg/chevron-up-icon.svg?raw';
import ChatActionButton from './ChatActionButton';
import ChatStage from './ChatStage';
import LoadingIndicator from './LoadingIndicator';
import VoiceInputButton from './VoiceInputButton';
import TeaserListComponent from './TeaserListComponent';
import DocumentPreviewer from './DocumentPreviewer';
import TabComponent from './TabComponent';
import CitationList from './CitationList';
import ChatThreadComponent from './ChatThreadComponent';
import ChatController from './ChatController';
import ChatHistoryController from './ChatHistoryController';

const ChatComponent = () => {
  const [inputPosition, setInputPosition] = useState('sticky');
  const [interactionModel, setInteractionModel] = useState('chat');
  const [apiUrl, setApiUrl] = useState(chatHttpOptions.url);
  const [isCustomBranding, setIsCustomBranding] = useState(globalConfig.IS_CUSTOM_BRANDING);
  const [useStream, setUseStream] = useState(chatHttpOptions.stream);
  const [overrides, setOverrides] = useState({});
  const [customStyles, setCustomStyles] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isResetInput, setIsResetInput] = useState(false);
  const [isShowingThoughtProcess, setIsShowingThoughtProcess] = useState(false);
  const [isDefaultPromptsEnabled, setIsDefaultPromptsEnabled] = useState(globalConfig.IS_DEFAULT_PROMPTS_ENABLED && !isChatStarted);
  const [selectedCitation, setSelectedCitation] = useState(undefined);
  const [selectedChatEntry, setSelectedChatEntry] = useState(undefined);
  const [selectedAsideTab, setSelectedAsideTab] = useState('tab-thought-process');
  const [chatThread, setChatThread] = useState([]);
  const questionInputRef = useRef(null);
  const chatController = new ChatController();
  const chatHistoryController = new ChatHistoryController();

  useEffect(() => {
    if (customStyles) {
      document.documentElement.style.setProperty('--c-accent-high', customStyles.AccentHigh);
      document.documentElement.style.setProperty('--c-accent-lighter', customStyles.AccentLight);
      document.documentElement.style.setProperty('--c-accent-dark', customStyles.AccentDark);
      document.documentElement.style.setProperty('--c-text-color', customStyles.TextColor);
      document.documentElement.style.setProperty('--c-light-gray', customStyles.BackgroundColor);
      document.documentElement.style.setProperty('--c-dark-gray', customStyles.ForegroundColor);
      document.documentElement.style.setProperty('--c-base-gray', customStyles.FormBackgroundColor);
      document.documentElement.style.setProperty('--radius-base', customStyles.BorderRadius);
      document.documentElement.style.setProperty('--border-base', customStyles.BorderWidth);
      document.documentElement.style.setProperty('--font-base', customStyles.FontBaseSize);
    }
  }, [customStyles]);

  const setQuestionInputValue = (value) => {
    if (questionInputRef.current) {
      questionInputRef.current.value = DOMPurify.sanitize(value || '');
      setCurrentQuestion(questionInputRef.current.value);
    }
  };

  const handleVoiceInput = (event) => {
    event.preventDefault();
    setQuestionInputValue(event.detail.input);
  };

  const handleQuestionInputClick = (event) => {
    event.preventDefault();
    setQuestionInputValue(event.detail.question);
  };

  const handleCitationClick = (event) => {
    event.preventDefault();
    setSelectedCitation(event.detail.citation);

    if (!isShowingThoughtProcess) {
      if (event.detail.chatThreadEntry) {
        setSelectedChatEntry(event.detail.chatThreadEntry);
      }
      handleExpandAside();
      setSelectedAsideTab('tab-citations');
    }
  };

  const getMessageContext = () => {
    if (interactionModel === 'ask') {
      return [];
    }

    const history = [
      ...chatThread,
      ...(chatHistoryController.showChatHistory ? chatHistoryController.chatHistory : []),
    ];

    const messages = history.map((entry) => {
      return {
        content: chatEntryToString(entry),
        role: entry.isUserMessage ? 'user' : 'assistant',
      };
    });

    return messages;
  };

  const handleUserChatSubmit = async (event) => {
    event.preventDefault();
    collapseAside(event);
    const question = DOMPurify.sanitize(questionInputRef.current.value);
    setIsChatStarted(true);
    setIsDefaultPromptsEnabled(false);

    await chatController.generateAnswer(
      {
        ...requestOptions,
        overrides: {
          ...requestOptions.overrides,
          ...overrides,
        },
        question,
        type: interactionModel,
        messages: getMessageContext(),
      },
      {
        ...chatHttpOptions,
        url: apiUrl,
        stream: useStream,
      },
    );

    if (interactionModel === 'chat') {
      chatHistoryController.saveChatHistory(chatThread);
    }

    questionInputRef.current.value = '';
    setIsResetInput(false);
  };

  const resetInputField = (event) => {
    event.preventDefault();
    questionInputRef.current.value = '';
    setCurrentQuestion('');
    setIsResetInput(false);
  };

  const resetCurrentChat = (event) => {
    setIsChatStarted(false);
    setChatThread([]);
    setIsDisabled(false);
    setIsDefaultPromptsEnabled(true);
    setSelectedCitation(undefined);
    chatController.reset();
    chatHistoryController.saveChatHistory([]);
    collapseAside(event);
    handleUserChatCancel(event);
  };

  const showDefaultPrompts = (event) => {
    if (!isDefaultPromptsEnabled) {
      resetCurrentChat(event);
    }
  };

  const handleOnInputChange = () => {
    setIsResetInput(!!questionInputRef.current.value);
  };

  const handleUserChatCancel = (event) => {
    event.preventDefault();
    chatController.cancelRequest();
  };

  const handleExpandAside = (event) => {
    event?.preventDefault();
    setIsShowingThoughtProcess(true);
    setSelectedAsideTab('tab-thought-process');
    document.querySelector('#overlay').classList.add('active');
    document.querySelector('#chat__containerWrapper').classList.add('aside-open');
  };

  const collapseAside = (event) => {
    event.preventDefault();
    setIsShowingThoughtProcess(false);
    setSelectedCitation(undefined);
    document.querySelector('#chat__containerWrapper').classList.remove('aside-open');
    document.querySelector('#overlay').classList.remove('active');
  };

  const renderChatOrCancelButton = () => {
    const submitChatButton = (
      <button
        className="chatbox__button"
        data-testid="submit-question-button"
        onClick={handleUserChatSubmit}
        title={globalConfig.CHAT_BUTTON_LABEL_TEXT}
        disabled={isDisabled}
      >
        <img src={iconSend} alt="Send" />
      </button>
    );
    const cancelChatButton = (
      <button
        className="chatbox__button"
        data-testid="cancel-question-button"
        onClick={handleUserChatCancel}
        title={globalConfig.CHAT_CANCEL_BUTTON_LABEL_TEXT}
      >
        <img src={iconCancel} alt="Cancel" />
      </button>
    );

    return chatController.isProcessingResponse ? cancelChatButton : submitChatButton;
  };

  const renderChatEntryTabContent = (entry) => {
    return (
      <TabComponent
        tabs={[
          {
            id: 'tab-thought-process',
            label: globalConfig.THOUGHT_PROCESS_LABEL,
          },
          {
            id: 'tab-support-context',
            label: globalConfig.SUPPORT_CONTEXT_LABEL,
          },
          {
            id: 'tab-citations',
            label: globalConfig.CITATIONS_TAB_LABEL,
          },
        ]}
        selectedTabId={selectedAsideTab}
      >
        <div slot="tab-thought-process" className="tab-component__content">
          {entry && entry.thoughts ? <p className="tab-component__paragraph" dangerouslySetInnerHTML={{ __html: entry.thoughts }} /> : ''}
        </div>
        <div slot="tab-support-context" className="tab-component__content">
          {entry && entry.dataPoints
            ? <TeaserListComponent
                alwaysRow={true}
                teasers={entry.dataPoints.map((d) => {
                  return { description: d };
                })}
              />
            : ''}
        </div>
        {entry && entry.citations
          ? (
            <div slot="tab-citations" className="tab-component__content">
              <CitationList
                citations={entry.citations}
                label={globalConfig.CITATIONS_LABEL}
                selectedCitation={selectedCitation}
                onCitationClick={handleCitationClick}
              />
              {selectedCitation
                ? <DocumentPreviewer url={`${apiUrl}/content/${selectedCitation.text}`} />
                : ''}
            </div>
          )
          : ''}
      </TabComponent>
    );
  };

  const handleChatEntryActionButtonClick = (event) => {
    if (event.detail.id === 'chat-show-thought-process') {
      setSelectedChatEntry(event.detail.chatThreadEntry);
      handleExpandAside(event);
    }
  };

  useEffect(() => {
    setIsDisabled(chatController.generatingAnswer);

    if (chatController.processingMessage) {
      const processingEntry = chatController.processingMessage;
      const index = chatThread.findIndex((entry) => entry.id === processingEntry.id);

      setChatThread(
        index > -1
          ? newListWithEntryAtIndex(chatThread, index, processingEntry)
          : [...chatThread, processingEntry]
      );
    }
  }, [chatController.generatingAnswer, chatController.processingMessage]);

  const renderChatThread = (chatThread) => {
    return (
      <ChatThreadComponent
        chatThread={chatThread}
        actionButtons={[
          {
            id: 'chat-show-thought-process',
            label: globalConfig.SHOW_THOUGH_PROCESS_BUTTON_LABEL_TEXT,
            svgIcon: iconLightBulb,
            isDisabled: isShowingThoughtProcess,
          },
        ]}
        isDisabled={isDisabled}
        isProcessingResponse={chatController.isProcessingResponse}
        selectedCitation={selectedCitation}
        isCustomBranding={isCustomBranding}
        svgIcon={iconLogo}
        onActionButtonClick={handleChatEntryActionButtonClick}
        onCitationClick={handleCitationClick}
        onFollowupClick={handleQuestionInputClick}
      />
    );
  };

  return (
    <div>
      <div id="overlay" className="overlay"></div>
      <section id="chat__containerWrapper" className="chat__containerWrapper">
        {isCustomBranding && !isChatStarted
          ? <ChatStage
              svgIcon={iconLogo}
              pagetitle={globalConfig.BRANDING_HEADLINE}
              url={globalConfig.BRANDING_URL}
            />
          : ''}
        <section className="chat__container" id="chat-container">
          {isChatStarted
            ? (
              <div>
                <div className="chat__header--thread">
                  {interactionModel === 'chat'
                    ? chatHistoryController.renderHistoryButton({ disabled: isDisabled })
                    : ''}
                  <ChatActionButton
                    label={globalConfig.RESET_CHAT_BUTTON_TITLE}
                    actionId="chat-reset-button"
                    onClick={resetCurrentChat}
                    svgIcon={iconDelete}
                  />
                </div>
                {chatHistoryController.showChatHistory
                  ? (
                    <div className="chat-history__container">
                      {renderChatThread(chatHistoryController.chatHistory)}
                      <div className="chat-history__footer">
                        <img src={iconUp} alt="Up" />
                        {globalConfig.CHAT_HISTORY_FOOTER_TEXT.replace(
                          globalConfig.CHAT_MAX_COUNT_TAG,
                          MAX_CHAT_HISTORY,
                        )}
                        <img src={iconUp} alt="Up" />
                      </div>
                    </div>
                  )
                  : ''}
                {renderChatThread(chatThread)}
              </div>
            )
            : ''}
          {chatController.isAwaitingResponse
            ? <LoadingIndicator label={globalConfig.LOADING_INDICATOR_TEXT} />
            : ''}
          <div className="chat__container">
            {isDefaultPromptsEnabled
              ? (
                <TeaserListComponent
                  heading={interactionModel === 'chat'
                    ? teaserListTexts.HEADING_CHAT
                    : teaserListTexts.HEADING_ASK}
                  clickable={true}
                  actionLabel={teaserListTexts.TEASER_CTA_LABEL}
                  onTeaserClick={handleQuestionInputClick}
                  teasers={teaserListTexts.DEFAULT_PROMPTS}
                />
              )
              : ''}
          </div>
          <form
            id="chat-form"
            className={`form__container ${inputPosition === 'sticky' ? 'form__container-sticky' : ''}`}
          >
            <div className="chatbox__container container-col container-row">
              <div className="chatbox__input-container display-flex-grow container-row">
                <input
                  className="chatbox__input display-flex-grow"
                  data-testid="question-input"
                  ref={questionInputRef}
                  placeholder={globalConfig.CHAT_INPUT_PLACEHOLDER}
                  aria-labelledby="chatbox-label"
                  id="chatbox"
                  name="chatbox"
                  type="text"
                  disabled={isDisabled}
                  autoComplete="off"
                  onKeyUp={handleOnInputChange}
                />
                {isResetInput ? '' : <VoiceInputButton onVoiceInput={handleVoiceInput} />}
              </div>
              {renderChatOrCancelButton()}
              <button
                title={globalConfig.RESET_BUTTON_TITLE_TEXT}
                className="chatbox__button--reset"
                hidden={!isResetInput}
                type="reset"
                id="resetBtn"
                onClick={resetInputField}
              >
                {globalConfig.RESET_BUTTON_LABEL_TEXT}
              </button>
            </div>
            {isDefaultPromptsEnabled
              ? ''
              : (
                <div className="chat__containerFooter">
                  <button type="button" onClick={showDefaultPrompts} className="defaults__span button">
                    {globalConfig.DISPLAY_DEFAULT_PROMPTS_BUTTON}
                  </button>
                </div>
              )}
          </form>
        </section>
        {isShowingThoughtProcess
          ? (
            <aside className="aside" data-testid="aside-thought-process">
              <div className="aside__header">
                <ChatActionButton
                  label={globalConfig.HIDE_THOUGH_PROCESS_BUTTON_LABEL_TEXT}
                  actionId="chat-hide-thought-process"
                  onClick={collapseAside}
                  svgIcon={iconClose}
                />
              </div>
              {renderChatEntryTabContent(selectedChatEntry)}
            </aside>
          )
          : ''}
      </section>
    </div>
  );
};

export default ChatComponent;
