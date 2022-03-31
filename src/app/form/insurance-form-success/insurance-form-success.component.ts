import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-insurance-form-success',
  templateUrl: './insurance-form-success.component.html',
  styleUrls: ['./insurance-form-success.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class InsuranceFormSuccessComponent implements OnInit {
  constructor(private constants: AppConstants) {}

  public successText: String = '';
  public successMessage: String = '';
  public navigateToHomeText: String = '';

  ngOnInit(): void {
    this.intitializeConstants();
  }

  intitializeConstants() {
    this.successText = this.constants.successText;
    this.successMessage = this.constants.successMessage;
    this.navigateToHomeText = this.constants.navigateToHomeText;
  }
}
