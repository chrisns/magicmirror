import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlarmComponent} from './alarm.component';
import {AlarmStateToStringPipe} from './alarm.pipes';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmComponent, AlarmStateToStringPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.alarm = {
      zones: [
        null,
        {subtype: 'V_CONTACT'},
        {subtype: 'SHOCK_CONTACT', troubles: ['something']},
        {subtype: 'MOTION_SENSOR'}
      ]
    };
  });
  describe('zones', () => {

    it('should filter null zones', () =>
      expect(component.zones).not.toContain(null)
    );
    it('should filter non contact zones', () =>
      expect(component.zones).not.toContain(jasmine.objectContaining({subtype: 'MOTION_SENSOR'}))
    );
    it('should retain contact sensors', () =>
      expect(component.zones).toContain(jasmine.objectContaining({subtype: 'V_CONTACT'}))
    );
  });
  describe('troubledZones', () => {
    it('should retain the troubled zones', () =>
      expect(component.troubledZones).toContain(jasmine.objectContaining({subtype: 'SHOCK_CONTACT'}))
    );
    it('should filter out untroubled zones', () =>
      expect(component.troubledZones).not.toContain(jasmine.objectContaining({subtype: 'V_CONTACT'}))
    );
  });

  describe('View', () => {
    beforeEach(() => {
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
    });
    describe('armed home', () => {
      it('should show the correct text when the alarm is armed home', () => {
        component.alarm = {state: 'Home'};
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).toContain('Armed Home');
      });
    });
    describe('armed away', () => {
      it('should show the correct text when the alarm is armed home', () => {
        component.alarm = {state: 'Away'};
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).toContain('Armed Away');
      });
    });

    describe('disarmed', () => {
      it('should show the correct text when the alarm is disarmed', () => {
        component.alarm = {state: 'Disarm'};
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).toContain('Disarmed');
      });
    });
    // describe('armed away');
    describe('open doors', () => {
      beforeEach(() => {
        component.alarm = {
          zones: [
            {subtype: 'CONTACT', troubles: ['something'], location: 'somewhere'},
            {subtype: 'CONTACT', troubles: ['something'], location: 'somewhere else'},
          ]
        };
        fixture.detectChanges();
      });

      it('should show a list of troubled zones', () =>
        expect(compiled.querySelectorAll('li').length).toBe(2));

      it('should show that not ready to arm', () =>
        expect(compiled.querySelector('p').textContent).toContain('not ready to arm'));
    });

    describe('ready to arm', () => {
      it('should show alarm is ready to arm', () => {
        component.alarm = {ready_status: true};
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).not.toContain('not ready to arm');
      });
    });

    describe('ready to arm', () => {
      it('should show alarm is ready to arm', () => {
        component.alarm = {ready_status: false};
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).toContain('not ready to arm');
      });
    });

    describe('closed doors', () => {
      beforeEach(() => {
        component.alarm = {
          zones: [
            {subtype: 'CONTACT', troubles: null, location: 'somewhere'},
            {subtype: 'CONTACT', troubles: null, location: 'somewhere else'}
          ]
        };
        fixture.detectChanges();
      });

      it('should show a list of troubled zones', () =>
        expect(compiled.querySelectorAll('li').length).toBe(0));

    });

  });
});
