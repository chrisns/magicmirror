import {Component, Input} from '@angular/core';

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent {
  @Input() cameras: Array<object>;
}
