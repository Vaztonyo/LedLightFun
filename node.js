var five = require("johnny-five");

// Create an instance of the Board class - referring to the Arduino Micro Controller 'board'
var board = new five.Board();
var stopBlink;
var stopInterval;

board.on('ready', function() {
  console.log('Board Ready!');
  var pin = new five.Pin(7);
  var led = new five.Led(7);



  var LedLight = function() {

    this.on = function() {
      led.on();
    }
    this.off = function() {
      led.off();
    }
    this.blink = function() {
      led.blink();
    }
    this.blinkSlow = function() {
      led.blink();
     setInterval(function() {
       led.blink();
          stopBlink = setTimeout(function() {
            led.blink();
          }, 100);
        });
    }
  }

  function myStopFunction() {
    clearInterval(stopInterval);
    clearTimeout(stopBlink);
}

  var light = new LedLight(7);
  light.off();


  var counter = 0;

  stopInterval = setInterval(function() {
    counter++
    console.log(counter);
    if (counter == 5) {
      light.on();
    } else if (counter == 8) {
      light.blink();
    } else if (counter == 17) {
      light.blinkSlow();
      myStopFunction();
      light.off();
      counter = 0;
    }
  }, 500);
});
