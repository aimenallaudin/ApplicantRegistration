import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from 'src/app/shared/applicant.service';

@Component({
  selector: 'app-applicant-detail-form',
  templateUrl: './applicant-detail-form.component.html',
  styles: [
  ]
})
export class ApplicantDetailFormComponent implements OnInit {

  constructor(public service:ApplicantService) { }

  ngOnInit(): void {
  }
  public ApplicantDetailForm = new FormGroup({
    name: new FormControl( [Validators.required, Validators.minLength(5)]),
    familyName: new FormControl( [Validators.required, Validators.minLength(5)]),
    address: new FormControl( [Validators.required, Validators.minLength(10)]),
    countryOfOrigin: new FormControl( Validators.required),
    emailAddress: new FormControl( [Validators.required, Validators.email]),
    age: new FormControl( Validators.required),
    hired: new FormControl( Validators.required)
  },{updateOn: 'blur'});
  get f() {
    return this.ApplicantDetailForm.controls;
  }
  
}

