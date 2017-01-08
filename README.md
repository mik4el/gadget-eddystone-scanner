# gadget-eddystone-scanner
Scan nearby eddystone beacons with TLM frames and upload to web service

## Setup
Requires python <3.0. See further requirements on https://github.com/sandeepmistry/noble

1. `npm install`

## Debugging
* Scan for eddystone beacons: `node scan_eddystone_beacons.js`
* Broadcast a test beacon with URL and TLM: `node broadcast_eddystone_beacon.js`
