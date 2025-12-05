import { useCallback, useState } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.fluent.blue.light.css';
import { SpeechToText, type SpeechToTextTypes } from 'devextreme-react/speech-to-text';
import { TextArea } from 'devextreme-react/text-area';
import notify from 'devextreme/ui/notify';

const speechRecognitionConfig = { continuous: true };

function App(): JSX.Element {
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const handleResult = useCallback((e: SpeechToTextTypes.ResultEvent): void => {
    const speechEvent = e.event as SpeechRecognitionEvent;
    const resultText = Object.values(speechEvent.results)
      .map((result: unknown) => (result as SpeechRecognitionResult)[0].transcript)
      .join('');
    setTextAreaValue(resultText);
  }, []);

  const handleError = useCallback((e: SpeechToTextTypes.ErrorEvent): void => {
    const speechEvent = e.event as SpeechRecognitionErrorEvent;
    if (speechEvent.error === 'not-allowed') {
      notify('Microphone access denied. Please grant microphone permissions and try again.', 'error', 5000);
    } else {
      notify(`An error occurred during speech recognition: ${speechEvent.error}`, 'error', 5000);
    }
  }, []);

  return (
    <div className="demo-container">
      <SpeechToText
        onResult={handleResult}
        onError={handleError}
        speechRecognitionConfig={speechRecognitionConfig}
      />
      <TextArea
        height={160}
        width={320}
        placeholder="Transcribed text will appear here..."
        value={textAreaValue}
      />
    </div>
  );
}

export default App;
