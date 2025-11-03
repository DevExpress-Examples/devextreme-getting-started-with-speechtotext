import { Component } from '@angular/core';
import { type SpeechToTextTypes } from 'devextreme/ui/speech-to-text';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  speechRecognitionConfig = { continuous: true };

  textAreaValue = '';

  onResult(e: SpeechToTextTypes.ResultEvent): void {
    const resultText = Object.values(e.event.results)
      .map((resultItem: unknown) => (resultItem as SpeechRecognitionResult)[0].transcript)
      .join(' ');

    this.textAreaValue = resultText;
  }

  onError(e: SpeechToTextTypes.ErrorEvent): void {
    if (e.event.error === 'not-allowed') {
      notify('Microphone access denied. Please enable microphone permissions and try again.', 'error', 5000);
    } else {
      notify(`An error occurred during speech recognition: ${e.event.error}`, 'error', 5000);
    }
  }
}
