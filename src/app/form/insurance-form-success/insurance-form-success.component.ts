import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';

@Component({
  selector: 'app-insurance-form-success',
  templateUrl: './insurance-form-success.component.html',
  styleUrls: ['./insurance-form-success.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class InsuranceFormSuccessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
