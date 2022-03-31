import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-insurance-home',
  templateUrl: './insurance-home.component.html',
  styleUrls: ['./insurance-home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class InsuranceHomeComponent implements OnInit {
  constructor(private constants: AppConstants) {}

  public welcomeText: String = '';
  public welcomeMessage: String = '';
  public startButtonText: String = '';

  ngOnInit(): void {
    this.intitializeConstants();
  }

  intitializeConstants() {
    this.welcomeText = this.constants.welcomeText;
    this.welcomeMessage = this.constants.welcomeMessage;
    this.startButtonText = this.constants.startButtonText;
  }
}
