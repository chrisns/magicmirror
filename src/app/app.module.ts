import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KeysPipe, StateToStringPipe, StateToClassPipe} from './pipes';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

var AWSIoTData = require('aws-iot-device-sdk');
var clientId = 'magicmirror-' + (Math.floor((Math.random() * 100000) + 1));

import {
  MqttModule,
  MqttService,
} from 'ngx-mqtt';

import {WeatherComponent} from './weather/weather.component';
import {WeatherIconComponent} from './weather-icon/weather-icon.component';
import {CamerasComponent} from './cameras/cameras.component';
import {AlarmComponent} from './alarm/alarm.component';
import {AlarmStateToStringPipe} from './alarm/alarm.pipes';
import {DoorbellComponent} from './doorbell/doorbell.component';

export function mqttServiceFactory() {
  let env = environment['__zone_symbol__value'];

  const mqttClient = AWSIoTData.device({
    region: env['REGION'],
    host: env['MQTT_HOST'],
    protocol: 'wss',
    maximumReconnectTimeMs: 8000,
    debug: true,
    accessKeyId: env['MQTT_USER'],
    secretKey: env['MQTT_PASS'],
  });
  return new MqttService({}, mqttClient);
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  declarations: [
    AppComponent,
    KeysPipe,
    StateToStringPipe,
    StateToClassPipe,
    WeatherComponent,
    WeatherIconComponent,
    CamerasComponent,
    AlarmComponent,
    AlarmStateToStringPipe,
    DoorbellComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public load() {
    console.log('foo');
  }
}
