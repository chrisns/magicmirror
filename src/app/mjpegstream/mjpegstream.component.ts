import {Component, Input, ElementRef, AfterContentInit} from '@angular/core';

@Component({
  selector: 'mjpegstream',
  templateUrl: './mjpegstream.component.html'
})
export class MjpegStreamComponent implements AfterContentInit {
  @Input() public src: string;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    new MJPEG.Player(this.elementRef.nativeElement.getElementsByTagName('canvas')[0], this.src).start();
  }

}

// stolen from: https://gist.github.com/codebrainz/eeeeead894e8bdff059b
var MJPEG = (function (module) {
  'use strict';

  // class Stream { ...
  module.Stream = function (args) {
    var self = this;
    var autoStart = args.autoStart || false;

    self.url = args.url;
    self.refreshRate = args.refreshRate || 100;
    self.onStart = args.onStart || null;
    self.onFrame = args.onFrame || null;
    self.onStop = args.onStop || null;
    self.callbacks = {};
    self.running = false;
    self.frameTimer = 0;

    self.img = new Image();
    if (autoStart) {
      self.img.onload = self.start;
    }
    self.img.src = self.url;

    function setRunning(running) {
      self.running = running;
      if (self.running) {
        self.img.src = self.url;
        self.frameTimer = setInterval(function () {
          if (self.onFrame) {
            self.onFrame(self.img);
          }
        }, self.refreshRate);
        if (self.onStart) {
          self.onStart();
        }
      } else {
        self.img.src = '#';
        clearInterval(self.frameTimer);
        if (self.onStop) {
          self.onStop();
        }
      }
    }

    self.start = function () {
      setRunning(true);
    };
    self.stop = function () {
      setRunning(false);
    };
  };

  module.Player = function (canvas, url, options) {

    var self = this;
    var context = canvas.getContext('2d');

    if (!options)
      options = {};

    if (!url)
      return false;

    options.url = url;
    options.onFrame = updateFrame;
    options.onStart = function () {
      console.log('started');
    };
    options.onStop = function () {
      self.start();
      console.log('stopped');
    };

    self.stream = new module.Stream(options);

    canvas.addEventListener('click', function () {
      if (self.stream.running) {
        self.stop();
      }
      else {
        self.start();
      }
    }, false);

    function scaleRect(srcSize, dstSize) {
      var ratio = Math.min(dstSize.width / srcSize.width,
        dstSize.height / srcSize.height);
      var newRect = {
        x: 0, y: 0,
        width: srcSize.width * ratio,
        height: srcSize.height * ratio
      };
      newRect.x = (dstSize.width / 2) - (newRect.width / 2);
      newRect.y = (dstSize.height / 2) - (newRect.height / 2);
      return newRect;
    }

    function updateFrame(img) {
      var srcRect = {
        x: 0, y: 0,
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      var dstRect = scaleRect(srcRect, {
        width: canvas.width,
        height: canvas.height
      });
      try {
        context.drawImage(img,
          srcRect.x,
          srcRect.y,
          srcRect.width,
          srcRect.height,
          dstRect.x,
          dstRect.y,
          dstRect.width,
          dstRect.height
        );
        // console.log('.');
      } catch (e) {
        // if we can't draw, don't bother updating anymore
        self.stop();
        console.log('!');
        throw e;
      }
    }

    self.start = function () {
      self.stream.start();
    };
    self.stop = function () {
      self.stream.stop();
    };
  };

  return module;

})(MJPEG || {});
