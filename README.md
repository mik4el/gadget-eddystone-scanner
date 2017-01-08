# gadget-eddystone-scanner
Scan nearby eddystone beacons with TLM frames and upload to web service

## To run
Requires python <3.0. See further requirements on https://github.com/sandeepmistry/noble

1. `npm install`
1. Export credentials as environment variables
1. `node node scan_and_post_eddystone_beacons.js`

## Debugging
* Scan for eddystone beacons: `node scan_eddystone_beacons.js`
* Broadcast a test beacon with URL and TLM: `node broadcast_eddystone_beacon.js`

## Todos
* Make docker setup and deploy and test on raspi
