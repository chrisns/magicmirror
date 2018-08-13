import {Component, Input} from '@angular/core';

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.sass']
})
export class WeatherIconComponent {
  @Input() ic: string = '';
}
