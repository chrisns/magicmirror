import { Component, Input, SimpleChanges } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent {
  @Input() cameras: Array<any>
}
