import React, { useState, useEffect } from 'react';
import ChatActionButton from './ChatActionButton';
import { globalConfig, MAX_CHAT_HISTORY } from '../config/globalConfig';
import iconHistory from '../svg/history-icon.svg?raw';
import iconHistoryDismiss from '../svg/history-dismiss-icon.svg?raw';

const ChatHistoryController = ({ host }) => {
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const chatHistory = localStorage.getItem('ms-azoaicc:history');
    if (chatHistory) {
      const encodedHistory = atob(chatHistory);
      const decodedHistory = decodeURIComponent(encodedHistory);
      const history = JSON.parse(decodedHistory);

      const lastUserMessagesIndexes = history
        .map((entry, index) => {
          if (entry.isUserMessage) {
            return index;
          }
        })
        .filter((index) => index !== undefined)
        .slice(-MAX_CHAT_HISTORY);

      const trimmedHistory = lastUserMessagesIndexes.length === 0 ? history : history.slice(lastUserMessagesIndexes[0]);

      setChatHistory(trimmedHistory);
    }
  }, []);

  const saveChatHistory = (currentChat) => {
    const newChatHistory = [...chatHistory, ...currentChat];
    const utf8EncodedString = encodeURIComponent(JSON.stringify(newChatHistory));
    localStorage.setItem('ms-azoaicc:history', btoa(utf8EncodedString));
  };

  const handleChatHistoryButtonClick = (event) => {
    event.preventDefault();
    setShowChatHistory(!showChatHistory);
  };

  const renderHistoryButton = (options) => {
    return (
      <ChatActionButton
        label={showChatHistory ? globalConfig.HIDE_CHAT_HISTORY_LABEL : globalConfig.SHOW_CHAT_HISTORY_LABEL}
        actionId="chat-history-button"
        onClick={handleChatHistoryButtonClick}
        isDisabled={options?.disabled}
        svgIcon={showChatHistory ? iconHistoryDismiss : iconHistory}
      />
    );
  };

  return {
    showChatHistory,
    chatHistory,
    saveChatHistory,
    renderHistoryButton,
  };
};

export default ChatHistoryController;
