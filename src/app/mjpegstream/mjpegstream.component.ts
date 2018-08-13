import {Component, AfterViewInit, Input} from '@angular/core';

@Component({
  selector: 'mjpegstream',
  templateUrl: './mjpegstream.component.html',
  // styleUrls: ['./m.component.sass']
})
export class MjpegStreamComponent implements AfterViewInit {
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
    debugger;
    // console.log("foo")
  }

}
