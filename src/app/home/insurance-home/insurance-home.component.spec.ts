import {
  Directive,
  HostListener,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  waitForAsync,
  tick,
  fakeAsync,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InsuranceHomeComponent } from './insurance-home.component';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

@Component({
  template: '',
})
class DummyComponent {}

describe('Component: InsuranceHomeComponent', () => {
  let component: InsuranceHomeComponent;
  let fixture: ComponentFixture<InsuranceHomeComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [InsuranceHomeComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'insurance', component: DummyComponent },
        ]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(InsuranceHomeComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();
  }));
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  describe('#clickButton', async () => {
    it('should click begin button', fakeAsync(
      inject([Router, Location], (router: Router, location: Location) => {
        let buttonElement =
          fixture.debugElement.nativeElement.querySelector('.begin-btn');
        buttonElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/insurance');
          console.log('after expect');
        });
      })
    ));
  });
});
