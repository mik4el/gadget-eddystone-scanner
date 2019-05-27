FROM balenalib/raspberrypi3-node:8.16.0

RUN apt-get update && apt-get install -y \
  .gyp \
  python \
  make \
  g++ \
  bluetooth \
  bluez \
  libbluetooth-dev \
  libudev-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN DEBIAN_FRONTEND=noninteractive JOBS=MAX npm install --unsafe-perm
COPY . /usr/src/app/

