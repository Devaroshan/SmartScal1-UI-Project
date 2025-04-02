import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { SmartScaleApiService } from './components/services/smart-scale-api-service';

@NgModule({
  declarations: [AppComponent, InputComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [SmartScaleApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
