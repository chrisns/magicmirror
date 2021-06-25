import { Component, Input } from '@angular/core'

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent {
  @Input() cameras: Array<object>
  constructor () {
    //@ts-ignore
    if (!window.camrefresh) {
      //@ts-ignore
      window.camrefresh = setInterval(() => {
        Array.from(document.getElementsByClassName('static_cam')).forEach(
          el => {
            //@ts-ignore
            el.src = `${el.getAttribute('osrc')}?${Date.now()}`
          }
        )
      }, 100)
    }
  }
}
