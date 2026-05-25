import { Component } from '@angular/core';
import { type DxSpeechToTextTypes } from 'devextreme-angular/ui/speech-to-text';
import notify from 'devextreme/ui/notify';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  speechRecognitionConfig = { continuous: true };

  textAreaValue = '';

  handleResult(e: DxSpeechToTextTypes.ResultEvent): void {
    const speechEvent = e.event as SpeechRecognitionEvent;
    const resultText = Object.values(speechEvent.results)
      .map((resultItem: unknown) => (resultItem as SpeechRecognitionResult)[0].transcript)
      .join(' ');

    this.textAreaValue = resultText;
  }

  handleError(e: DxSpeechToTextTypes.ErrorEvent): void {
    const speechEvent = e.event as SpeechRecognitionErrorEvent;
    if (speechEvent.error === 'not-allowed') {
      notify('Microphone access denied. Please grant microphone permissions and try again.', 'error', 5000);
    } else {
      notify(`An error occurred during speech recognition: ${speechEvent.error}`, 'error', 5000);
    }
  }
}
