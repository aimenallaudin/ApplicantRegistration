import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantComponentComponent } from './applicant-component.component';

describe('ApplicantComponentComponent', () => {
  let component: ApplicantComponentComponent;
  let fixture: ComponentFixture<ApplicantComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
