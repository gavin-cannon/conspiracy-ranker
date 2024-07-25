import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConspiraciesComponent } from './conspiracies/conspiracies.component';
import { ConspiracyListComponent } from './conspiracies/conspiracy-list/conspiracy-list.component';
import { ConspiracyItemComponent } from './conspiracies/conspiracy-list/conspiracy-item/conspiracy-item.component';
import { ConspiracyEditComponent } from './conspiracies/conspiracy-edit/conspiracy-edit.component';
import { ConspiracyDetailsComponent } from './conspiracies/conspiracy-details/conspiracy-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConspiracyFilterPipe } from './conspiracies/conspiracy-filter.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ConspiraciesComponent,
    ConspiracyListComponent,
    ConspiracyItemComponent,
    ConspiracyEditComponent,
    ConspiracyDetailsComponent,
    ConspiracyFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
