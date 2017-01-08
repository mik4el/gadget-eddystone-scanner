var eddystoneBeacon = require('eddystone-beacon');

setInterval(function() {
    var randomBatteryVoltage = Math.floor((Math.random() * 10000) + 500); // between 500 and 10,000
    var randomTemperature = (Math.random() * 256.0) - 128.0; // between -128.0 and 128.0

    eddystoneBeacon.setBatteryVoltage(randomBatteryVoltage);
    eddystoneBeacon.setTemperature(randomTemperature);
}, 1000);

var options = {
  tlmCount: 2,       // 2 TLM frames
  tlmPeriod: 10      // every 10 advertisements
};

eddystoneBeacon.advertiseUrl("https://m4bd.se", options);
