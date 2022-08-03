import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDetailFormComponent } from './applicant-detail-form.component';

describe('ApplicantDetailFormComponent', () => {
  let component: ApplicantDetailFormComponent;
  let fixture: ComponentFixture<ApplicantDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
