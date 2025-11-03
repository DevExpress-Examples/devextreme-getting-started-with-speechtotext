import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxSpeechToTextModule } from 'devextreme-angular/ui/speech-to-text';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxTextAreaModule,
    DxSpeechToTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
