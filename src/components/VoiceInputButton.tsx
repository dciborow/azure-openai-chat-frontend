import React, { useState, useEffect } from 'react';
import { Button } from '@fluentui/react-components';
import { globalConfig } from '../config/globalConfig';
import iconMicOff from '../svg/mic-icon.svg';
import iconMicOn from '../svg/mic-record-on-icon.svg';

const VoiceInputButton = ({ onVoiceInput }) => {
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [enableVoiceListening, setEnableVoiceListening] = useState(false);
  const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
  let speechRecognition;

  useEffect(() => {
    if (recognitionSvc) {
      setShowVoiceInput(true);
      speechRecognition = new recognitionSvc();
      speechRecognition.continuous = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        let input = '';
        for (const result of event.results) {
          input += `${result[0].transcript}`;
        }
        onVoiceInput({ detail: { input } });
      };

      speechRecognition.onerror = (event) => {
        speechRecognition.stop();
        console.log(`Speech recognition error detected: ${event.error} - ${event.message}`);
      };
    }
  }, [recognitionSvc]);

  const handleVoiceInput = (event) => {
    event.preventDefault();
    setEnableVoiceListening(!enableVoiceListening);
    if (enableVoiceListening) {
      speechRecognition.start();
    } else {
      speechRecognition.stop();
    }
  };

  return showVoiceInput ? (
    <Button
      title={enableVoiceListening ? globalConfig.CHAT_VOICE_REC_BUTTON_LABEL_TEXT : globalConfig.CHAT_VOICE_BUTTON_LABEL_TEXT}
      className={enableVoiceListening ? 'recording' : 'not-recording'}
      onClick={handleVoiceInput}
      icon={<img src={enableVoiceListening ? iconMicOn : iconMicOff} alt="Voice Input" />}
    />
  ) : null;
};

export default VoiceInputButton;
