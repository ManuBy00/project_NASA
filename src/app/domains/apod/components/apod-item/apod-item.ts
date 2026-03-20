import { Component, input } from '@angular/core';
import { ApodResponse } from '../../models/ApodResponse';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-apod-item',
  imports: [DatePipe, RouterLink],
  templateUrl: './apod-item.html',
  styleUrl: './apod-item.css',
})
export class ApodItem {
  apodResponse = input<ApodResponse>();
}
