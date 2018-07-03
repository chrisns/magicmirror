import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent implements OnInit {
  private _cameras = [];

  constructor() {
  }

  @Input()
  set cameras(cameras: Array<object>) {
    this._cameras = cameras;
  }

  get cameras(): Array<object> {
    return this._cameras;
  }


  ngOnInit() {
  }

}
