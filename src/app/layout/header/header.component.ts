import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private constants: AppConstants) {}

  public headerText: String = '';

  ngOnInit(): void {
    this.headerText = this.constants.headerText;
  }
}
