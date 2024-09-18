import React from 'react';
import BaseChatComponent from './BaseChatComponent';
import ChatActionButton from './ChatActionButton';
import ChatStage from './ChatStage';
import LoadingIndicator from './LoadingIndicator';
import VoiceInputButton from './VoiceInputButton';
import TeaserListComponent from './TeaserListComponent';
import DocumentPreviewer from './DocumentPreviewer';
import TabComponent from './TabComponent';
import CitationList from './CitationList';
import ChatThreadComponent from './ChatThreadComponent';

const ChatThreadComponent = () => {
  return (
    <BaseChatComponent>
      {({
        inputPosition,
        interactionModel,
        apiUrl,
        isCustomBranding,
        useStream,
        overrides,
        customStyles,
        currentQuestion,
        isDisabled,
        isChatStarted,
        isResetInput,
        isShowingThoughtProcess,
        isDefaultPromptsEnabled,
        selectedCitation,
        selectedChatEntry,
        selectedAsideTab,
        chatThread,
        questionInputRef,
        chatController,
        chatHistoryController,
        setQuestionInputValue,
        handleVoiceInput,
        handleQuestionInputClick,
        handleCitationClick,
        getMessageContext,
        handleUserChatSubmit,
        resetInputField,
        resetCurrentChat,
        showDefaultPrompts,
        handleOnInputChange,
        handleUserChatCancel,
        handleExpandAside,
        collapseAside,
        renderChatOrCancelButton,
        renderChatEntryTabContent,
        handleChatEntryActionButtonClick,
        renderChatThread,
      }) => (
        <div>
          <div id="overlay" className="overlay"></div>
          <section id="chat__containerWrapper" className="chat__containerWrapper">
            {isCustomBranding && !isChatStarted ? (
              <ChatStage
                svgIcon={iconLogo}
                pagetitle={globalConfig.BRANDING_HEADLINE}
                url={globalConfig.BRANDING_URL}
              />
            ) : (
              ''
            )}
            <section className="chat__container" id="chat-container">
              {isChatStarted ? (
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
                  {chatHistoryController.showChatHistory ? (
                    <div className="chat-history__container">
                      {renderChatThread(chatHistoryController.chatHistory)}
                      <div className="chat-history__footer">
                        <img src={iconUp} alt="Up" />
                        {globalConfig.CHAT_HISTORY_FOOTER_TEXT.replace(
                          globalConfig.CHAT_MAX_COUNT_TAG,
                          MAX_CHAT_HISTORY
                        )}
                        <img src={iconUp} alt="Up" />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  {renderChatThread(chatThread)}
                </div>
              ) : (
                ''
              )}
              {chatController.isAwaitingResponse ? (
                <LoadingIndicator label={globalConfig.LOADING_INDICATOR_TEXT} />
              ) : (
                ''
              )}
              <div className="chat__container">
                {isDefaultPromptsEnabled ? (
                  <TeaserListComponent
                    heading={
                      interactionModel === 'chat'
                        ? teaserListTexts.HEADING_CHAT
                        : teaserListTexts.HEADING_ASK
                    }
                    clickable={true}
                    actionLabel={teaserListTexts.TEASER_CTA_LABEL}
                    onTeaserClick={handleQuestionInputClick}
                    teasers={teaserListTexts.DEFAULT_PROMPTS}
                  />
                ) : (
                  ''
                )}
              </div>
              <form
                id="chat-form"
                className={`form__container ${
                  inputPosition === 'sticky' ? 'form__container-sticky' : ''
                }`}
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
                {isDefaultPromptsEnabled ? (
                  ''
                ) : (
                  <div className="chat__containerFooter">
                    <button type="button" onClick={showDefaultPrompts} className="defaults__span button">
                      {globalConfig.DISPLAY_DEFAULT_PROMPTS_BUTTON}
                    </button>
                  </div>
                )}
              </form>
            </section>
            {isShowingThoughtProcess ? (
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
            ) : (
              ''
            )}
          </section>
        </div>
      )}
    </BaseChatComponent>
  );
};

export default ChatThreadComponent;
