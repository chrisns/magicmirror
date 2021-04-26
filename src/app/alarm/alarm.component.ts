import { Component, Input } from '@angular/core'
import { filter, get } from 'lodash'

@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.sass']
})
export class AlarmComponent {
  @Input() alarm: object = {}
  @Input() troubles: Array<object> = []

  constructor () {}

  public get troubledZones (): Array<object> {
    return this.troubles
      ? filter(this.troubles, trouble => trouble.trouble_type === 'OPENED')
      : []
  }
}
