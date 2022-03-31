import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InsuranceFormSuccessComponent } from './insurance-form-success.component';

describe('InsuranceFormSuccessComponent', () => {
  let component: InsuranceFormSuccessComponent;
  let fixture: ComponentFixture<InsuranceFormSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuranceFormSuccessComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceFormSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
