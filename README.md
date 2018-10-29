# MP3 Stream Recorder

A small Node program for recording an MP3 stream to a file. At some point I'll make a nice GUI web app to do this rather than relying on cronjob.

## Usage

Run the following in a terminal window or as a cronjob:

```bash
$ node index.js -s "http://firewall.pulsradio.com" -d 20000 -o "./shows"
```

Note: if running this as a cronjob, `node` and `index.js` need to be absolute paths to their respective locations.

## Arguments

* `-s` The URL of the stream to record (default `http://firewall.pulsradio.com`)
* `-d` The duration in milliseconds to record for (default `5000`)
* `-o` The output directory of the file (default `./shows`)

### IFTTT Support

The following arguments can also be supplied, in order to trigger an IFTTT Webhook applet each time a recording finishes.

* `--ifttt_event` The  **Event Name** entered on the Webhook applet
* `--ifttt_key` The user's IFTTT Webhooks key

## License
© 2018 Charlie Lee, http://charlielee.uk/

This source code is available as open source under the terms of the [GPL-3.0 License](http://www.gnu.org/licenses/gpl.html).
