# MP3 Stream Recorder

A small Node program for recording an MP3 stream to a file.

## Usage

Run the following in a terminal window or as a cronjob:

```node
node index.js -s "http://firewall.pulsradio.com" -d 20000
```

## Arguments

* `-s` The URL of the stream to record
* `-d` The duration in milliseconds to record for
* `-o` The output directory of the file (default `./shows`)
