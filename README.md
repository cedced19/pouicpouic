# Pouicpouic
A webcam system to watch my chickens.

[![Build Status](https://travis-ci.org/cedced19/pouicpouic.svg?branch=master)](https://travis-ci.org/cedced19/pouicpouic)
[![NPM version](https://badge.fury.io/js/pouicpouic.svg)](http://badge.fury.io/js/pouicpouic)

You need v4l2 to use this software: [installation](http://www.techytalk.info/webcam-settings-control-ubuntu-fedora-linux-operating-system-cli/).

## CLI

```bash
$ npm install pouicpouic -g
```

Go in command line to the directory where you have your save.

```bash
$ pouicpouic
```

## Server

```bash
$ git clone --deth=1 https://github.com/cedced19/pouicpouic
$ cd ./pouicpouic
$ npm install --production
$ npm start --production
```

## Options

```
--production               launch in production mode

--port [number]            specified the port
```

## API


There are Rest APIs on `http://localhost:7778/api/`.

## Developers

There are two npm command with which you can compile javascript:
* `npm run dev`: reload page on change and build bundle
* `npm run prod`: build and uglify bundle
