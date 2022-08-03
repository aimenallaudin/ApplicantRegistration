import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { Applicant } from './applicant.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private _myhttp: HttpClient) {
  }
  formData: Applicant = new Applicant(); //for post data
  readonly applicantUrl: string = 'https://localhost:7014/api/Applicants';
  listApplicant: Applicant[] = []; //to get applicants list
  //applicantData: Applicant = new Applicant();
  saveApplicant() {
    console.log("this is saveapp function: ",this.formData);
    console.log("this is the applicant list",this.listApplicant);
    return this._myhttp.post(this.applicantUrl, this.formData);

  }
  updateApplicant(id:Number) {

    return this._myhttp.put(this.applicantUrl+"/"+id, this.formData);
  }
  getApplicant(): Observable<Applicant[]> {
    return this._myhttp.get<Applicant[]>(this.applicantUrl);
  }
  deleteApplicant(id: Number) {
console.log("Entering deleteApplicant in service");


    return this._myhttp.delete(this.applicantUrl+"/"+id);
  }
}
