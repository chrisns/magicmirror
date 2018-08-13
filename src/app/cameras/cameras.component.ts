import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent implements OnChanges {
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
    // console.log($("cameras img").naturalHeight, "foooo")
    // debugger;
    // console.log("foo")
  }

  ngOnChanges(changes: SimpleChanges) {
    // debugger;

    console.log(changes, this)
    // changes.prop contains the old and the new value...
  }
}
