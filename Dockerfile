FROM resin/raspberrypi3-node:5.7.1

RUN apt-get update && apt-get install -y \
  bluetooth \
  bluez \
  libbluetooth-dev \
  libudev-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN DEBIAN_FRONTEND=noninteractive JOBS=MAX npm install --unsafe-perm
COPY . /usr/src/app/

