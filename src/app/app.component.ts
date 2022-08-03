import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, NgControlStatus } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CountryService } from './services/countryservice.service';
import { Country } from './country';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantComponentComponent } from './applicant-component/applicant-component.component';
//import { Applicant } from './Applicant';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ApplicantService } from './shared/applicant.service';
import { HttpClient } from '@angular/common/http';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Applicant } from './shared/applicant.model';
import { TitleStrategy } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ApplicantFF';
  listCountry?: any;
  listofall?: Country[];
  namesofcountries?: Country[];
  countrySelected?: string;
  alert: boolean = false;
  isReset: boolean = false;
  listData: any;
  show: boolean = false;
  countryNames: string[] = [];
  isSubmit?: boolean = true;
  buttonName: any = 'Show Applicants';
  buttonSubmit:any='Submit';
 

  public ApplicantForm = new FormGroup({

    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    familyName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    address: new FormControl("", [Validators.required, Validators.minLength(10)]),
    countryOfOrigin: new FormControl("", Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl("", Validators.required),
    hired: new FormControl('', Validators.required)
    
  }, { updateOn: 'blur' });


  constructor(private CountryService: CountryService, public dialog: MatDialog, public service: ApplicantService, private readonly httpClient: HttpClient) {
    this.isSubmit = false;
    this.isReset = false;
  }

  ngOnInit() {
  this.fetchCountry();
    this.service.getApplicant().subscribe(data => {
      this.service.listApplicant = data;
      console.log("ngOnInit called");
    });

  }
  onChange(event:any){
    console.log(event.value);
  }

  public fetchCountry(): void {
    console.log("fetch country opened()");
    let totalcountries: any; let i: 0;
    this.CountryService.getCountry().subscribe(data => {
      this.listCountry = data;

    },
      error => { console.log('Log the country error here:', error); }
    );


  }
  // public fetchCountry(): void {
  //   let i: 0;
  //   this.CountryService.getCountry().subscribe(data => {
  //     //data.listCountry.find(name.["common"])
  //     // data.listCountry.find(name.["common"])
  //     // this.listCountry = data;

  //     //  for(i=0;i<data.length; i++){
  //     //   this.listofall=this.listCountry[i]['find'](name);
  //     //  }

  //     //console.log('1st index',this.namesofcountries[0].name);
  //     console.log('COuntries fetched:::', this.listCountry);

  //     // x=>x.listCountry.find(name.["common"]);
  //     // const selectedcountry=this.listCountry.find(x=>x.listCountry.name);
  //     //console.log("Logginf in the fetched country pt1 ",selectedcountry );


  //    // console.log('logging in the fetched countries:::::', this.listofall);



  //   }
  //   );
  //   // error=>{ console.log('Log in the country error : ', error)},





  //   //x=this.listCountry?.find('Pakistan');


  // }

  public submitForm() {
    console.log("Entering submit form");
    if (this.service.formData.id == 0) {
      if (this.ApplicantForm.valid) {

        this.service.saveApplicant().subscribe(res => {
          this.isReset = true;
          this.resetApplicantProfile();
          this.refreshData();
        },
          err => { console.log("Data not correct to submit form: ", err); }
        );
      }
    }
      else{
        
        this.updateApplicants(this.service.formData.id);

      }
    
  }



  refreshData() {
    this.service.getApplicant().subscribe(res => {
      this.service.listApplicant = res;
      console.log("ListApplicant is updated!!", this.service.listApplicant.values);
    });

  }
  public resetApplicantProfile(): void {

    console.log("Reset applicant opened");
    this.alert = false;
    this.ApplicantForm.reset();



  }
  updateApplicants(id: Number) {
    this.service.updateApplicant(id).subscribe(d => {
      this.ApplicantForm.reset();
      this.refreshData();
    })
  }

  populateApplicant(selectedApplicant: Applicant) {
    console.log(selectedApplicant);
    
    this.service.formData = selectedApplicant;
  }
  deleteApplicant(appid: Number) {

    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteApplicant(appid).subscribe(data => {
        console.log("record is deleted");
        this.service.getApplicant().subscribe(data => {
          this.service.listApplicant = data;
        });
      }, err => {
        console.log('record is not deleted');
      }
      );
    }

  }
  get f() {
    return this.ApplicantForm.controls;
  }
  closeAlert() {
    this.alert = false;
  }
  openAlert(event: MouseEvent) {
    console.log("openAlert has opened::::::::ready to submit");
    this.alert = !this.alert;
    this.isSubmit = true;
    this.submitForm();

  }
  get toggleSubmit(){
    if(this.service.formData.id==0){
      this.isSubmit=true;
      this.buttonSubmit="Submit";
    }
    else{
      this.isSubmit=false;
      this.buttonSubmit="Update";
    }
    return this.isSubmit;
    
  }
  toggle(event: MouseEvent) {

    this.show = !this.show;
    if (this.show) {
      this.buttonName = "Hide Applicants";

    }
    else
      this.buttonName = "Show Applicants"


  }

  openDialog(event: MouseEvent): void {

    //debugger;
    console.log("openDialog opened");
    //let dialogRef = this.dialog.open(DialogExampleComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog result:', result);
    //   if (result == 'false') {
    if (confirm('Are you sure you want to reset this Page?')) {
      this.isReset = true;
      this.resetApplicantProfile();
    }
  }
}

