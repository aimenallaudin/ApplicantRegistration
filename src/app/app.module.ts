import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatButtonHarness} from '@angular/material/button/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ApplicantComponentComponent } from './applicant-component/applicant-component.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import  {ApplicantDetailFormComponent} from './applicant-detail/applicant-detail-form/applicant-detail-form.component'
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';
import { RowTableComponent } from './row-table/row-table.component';
import { ApplicantComponentComponent } from './applicant-component/applicant-component.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    
    
    AppComponent,
    ApplicantDetailComponent,
    DialogExampleComponent,
    ApplicantDetailFormComponent,
    RowTableComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule
    // NgbModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
   bootstrap: [AppComponent]
,entryComponents:[DialogExampleComponent]

})
export class AppModule { }
