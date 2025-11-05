import { useCallback, useState } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { SpeechToText, type SpeechToTextTypes } from 'devextreme-react/speech-to-text';
import { TextArea } from 'devextreme-react/text-area';
import notify from 'devextreme/ui/notify';

const speechRecognitionConfig = { continuous: true };

const [textAreaValue, setTextAreaValue] = useState<string>('');

const handleResult = useCallback((e: SpeechToTextTypes.ResultEvent): void => {
  const resultText = Object.values(e.event.results)
    .map((result: unknown) => (result as SpeechRecognitionResult)[0].transcript)
    .join('');
  setTextAreaValue(resultText);
}, []);

const handleError = useCallback((e: SpeechToTextTypes.ErrorEvent): void => {
  if (e.event.error === 'not-allowed') {
    notify('Microphone access denied. Please grant microphone permissions and try again.', 'error', 5000);
  } else {
    notify(`An error occurred during speech recognition: ${e.event.error}`, 'error', 5000);
  }
}, []);

function App(): JSX.Element {
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
