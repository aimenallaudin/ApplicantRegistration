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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  zero: Number = 0;
  show: boolean = false;
  countryNames: string[] = [];
  isSubmit?: boolean = true;
  buttonName: any = 'Show Applicants';
  buttonSubmit: any = 'Submit';

  public ApplicantForm = new FormGroup({

    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    familyName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    address: new FormControl("", [Validators.required, Validators.minLength(10)]),
    countryOfOrigin: new FormControl("", Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl("", Validators.required),
    hired: new FormControl(0, Validators.required)

  }, { updateOn: 'blur' });

  constructor(private CountryService: CountryService, public dialog: MatDialog, public service: ApplicantService, private readonly httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.isSubmit = false;
    this.isReset = false;
  }

  ngOnInit() {
    this.fetchCountry();
    this.service.getApplicant().subscribe(data => {
      this.service.listApplicant = data;
    });

  }
  onChange(event: any) {
  }
  // enum UserResponse {
  //   No = 0,
  //   Yes = 1,
  // }


  public fetchCountry(): void {
    let totalcountries: any; let i: 0;
    this.CountryService.getCountry().subscribe(data => {
      this.listCountry = data;
    },
      error => { }
    );


  }

  public submitForm() {
    if (this.service.formData.id == 0) {
      if (this.ApplicantForm.valid) {

        this.service.saveApplicant().subscribe(res => {
          this.isReset = true;
          this.resetApplicantProfile();
          this.refreshData();

        },
          err => { }
        );
      }
    }
    else {
      this.updateApplicants(this.service.formData.id);
    }
  }
  refreshData() {
    this.service.getApplicant().subscribe(res => {
      this.service.listApplicant = res;
    });
    this.ApplicantForm.controls['hired'].setValue(0);
  }
  public resetApplicantProfile(): void {
    this.alert = false;
    this.ApplicantForm.reset();
    this.ApplicantForm.controls['hired'].setValue(0);
  }
  updateApplicants(id: Number) {
    this.service.updateApplicant(id).subscribe(d => {
      this.ApplicantForm.reset();
      this.refreshData();
    })
  }

  populateApplicant(selectedApplicant: Applicant) {
    this.service.formData = selectedApplicant;
  }
  get f() {
    return this.ApplicantForm.controls;
  }
  closeAlert() {
    this.alert = false;
  }
  openAlert(event: MouseEvent) {
    this._snackBar.open("Registered Successfully!", "X", {
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
    this.alert = !this.alert;
    this.isSubmit = true;
    this.submitForm();

  }
  get toggleSubmit() {
    if (this.service.formData.id == 0) {
      this.isSubmit = true;
      this.buttonSubmit = "Submit";
    }
    else {
      this.isSubmit = false;
      this.buttonSubmit = "Update";
    }
    return this.isSubmit;

  }
  toggle(event: MouseEvent) {

    this.show = !this.show;
    if (this.show) {
      this.buttonName = "Hide Applicants";

    }
    else
      this.buttonName = "Show Applicants";


  }
  onReset(event: MouseEvent) {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '600px',
      height: '220px',
      data: 'reset'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'false') {
        // if (confirm('Are you sure you want to reset this Page?')) {
        this.isReset = true;

        this.resetApplicantProfile();
      }
    });
  }

}

