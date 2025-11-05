<script setup lang="ts">
import { ref } from 'vue';

import 'devextreme/dist/css/dx.fluent.blue.light.css';
import { DxSpeechToText, type DxSpeechToTextTypes } from 'devextreme-vue/speech-to-text';
import { DxTextArea } from 'devextreme-vue/text-area';
import notify from 'devextreme/ui/notify';

const speechRecognitionConfig = { continuous: true };

const textAreaValue = ref<string>('');

function handleResult(e: DxSpeechToTextTypes.ResultEvent): void {
  const resultText = Object.values(e.event.results)
    .map((resultItem: unknown) => (resultItem as SpeechRecognitionResult)[0].transcript)
    .join(' ');

  textAreaValue.value = resultText;
}

function handleError(e: DxSpeechToTextTypes.ErrorEvent): void {
  if (e.event.error === 'not-allowed') {
    notify('Microphone access denied. Please grant microphone permissions and try again.', 'error', 5000);
  } else {
    notify(`An error occurred during speech recognition: ${e.event.error}`, 'error', 5000);
  }
}

</script>
<template>
  <div class="demo-container">
    <DxSpeechToText
      @result="handleResult"
      @error="handleError"
      :speech-recognition-config="speechRecognitionConfig"
    />
    <DxTextArea
      :height="160"
      :width="320"
      placeholder="Transcribed text will appear here..."
      v-model:value="textAreaValue"
    />
  </div>
</template>
