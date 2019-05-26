# gadget-eddystone-scanner
NOTE: This is currently not working due to version mismatches in eddystone-beacon and latest docker images.

Use a raspberry pi 3 to scan nearby eddystone beacons with TLM frames and upload to web service. Based on https://github.com/sandeepmistry/node-eddystone-beacon-scanner/.

## To run on raspi
1. Install docker and docker-compose on raspberry pi 3
1. Clone repo and make local copy `.env` of `.env.sample`
1. `docker-compose up`

## To run development environment
Requires python <3.0. See further requirements on https://github.com/sandeepmistry/noble

1. `npm install`
1. Export credentials as environment variables
1. `node scan_and_post_eddystone_beacons.js`

## Debugging
* Scan for eddystone beacons: `node scan_eddystone_beacons.js`
* Broadcast a test beacon with URL and TLM: `node broadcast_eddystone_beacon.js`
