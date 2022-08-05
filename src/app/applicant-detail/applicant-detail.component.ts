import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Country } from '../country';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
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


openDialog(id:Number){
const dialogConfig=new MatDialogConfig();
dialogConfig.disableClose=true;
dialogConfig.autoFocus=true;
this.dialog.open(DialogExampleComponent, dialogConfig);
const dialogRef=this.dialog.open(DialogExampleComponent, dialogConfig);
dialogRef.afterClosed().subscribe(data=>console.log("Dialog works"));
}
onDelete(event: MouseEvent, id:Number){
  let dialogRef = this.dialog.open(DialogExampleComponent,{
    width:'600px',
    height:'220px',
    panelClass: 'my-dialog',
    data:'delete'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result == 'false') {
      this.service.deleteApplicant(id).subscribe(data => {
        this.service.getApplicant().subscribe(data => {
          this.service.listApplicant = data;
          this.refreshData();
        });
      }, err => {
       
      }
      );
  }
});
}
  refreshData() {
    
    
    this.service.getApplicant().subscribe(res => {
      this.service.listApplicant = res;
      
    });

  }
  populateApplicant(selectedApplicant: Applicant) {
    
    this.service.formData = selectedApplicant;
  }
  
}