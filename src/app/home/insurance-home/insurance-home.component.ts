import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations/fadeIn';

@Component({
  selector: 'app-insurance-home',
  templateUrl: './insurance-home.component.html',
  styleUrls: ['./insurance-home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class InsuranceHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
