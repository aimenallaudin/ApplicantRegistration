import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Country } from '../country';
import { Applicant } from '../shared/applicant.model';
import { ApplicantService } from '../shared/applicant.service';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {
  title = 'ApplicantFF';
  listCountry?: any;
  listofall?: Country[];
  namesofcountries?: Country[];
  countrySelected?: string;
  alert: boolean = false;
  isReset: boolean = false;
  listData: any;
  countryNames: string[] = [];
  isSubmit?: boolean = true;

  constructor( public dialog: MatDialog, public service: ApplicantService, private readonly httpClient: HttpClient) { 
    this.isSubmit = false;
    this.isReset = false;
  }

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
  deleteApplicant(id: Number) {

    
    if (confirm('Are you sure you want to delete this record?')) {
      
      this.service.deleteApplicant(id).subscribe(data => {
        console.log("record is deleted", id);
        this.service.getApplicant().subscribe(data => {
          this.service.listApplicant = data;
        });
      }, err => {
        console.log('record is not deleted');
      }
      );
    }

  }
  refreshData() {
    
    console.log("Refresh data opened sould only open before save");
    this.service.getApplicant().subscribe(res => {
      this.service.listApplicant = res;
      console.log("ListApplicant is updated!!", this.service.listApplicant.values);
    });

  }
  populateApplicant(selectedApplicant: Applicant) {
    
    console.log(selectedApplicant);
    this.service.formData = selectedApplicant;
  }
  
}