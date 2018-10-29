// Dependencies
var fs = require('fs');
var NodeID3 = require('node-id3');
var argv = require('minimist')(process.argv.slice(2));
var request = require('request');

// DURATION OF STREAM IN MILLISECONDS
const DURATION = argv.d || 5000;

// Check the output directory exists
var output_dir = argv.o || './shows';
if (!fs.existsSync(output_dir)){
  console.log("Created output directory:", output_dir)
  fs.mkdirSync(output_dir);
}

// Windows does not allow colons in file names
var output_file_date = new Date().toISOString().replace(/:/g, "-");

var output_file_name = `show_${output_file_date}.mp3`;
var output_file_path = `${output_dir}/${output_file_name}`;
var output_stream = fs.createWriteStream(output_file_path);

// Streams
var stream_url = argv.s || 'http://firewall.pulsradio.com';
var stream = request.get(stream_url);

console.log("Stream:", stream_url,"Duration:", DURATION, "ms");
console.log("Running audio stream recorder...");

// Counters
var start_time = null;
var cur_time = null;
var cur_length = null;

stream.on("response", function(response) {
  start_time = Date.now();

  stream.on('data', function(chunk) {
    // Calculate the time we have been streaming for
    cur_time = Date.now();
    cur_length = cur_time - start_time

    // Abort the stream when the duration is passed
    if (cur_length >= DURATION) {
      stream.abort();
      console.log("Finished. Output to:", output_file_name)

      // Send a get request via IFTTT (key is a command line argument)
      if (argv.ifttt_event && argv.ifttt_key) {
        console.log("Sending a notification to IFTTT")
        request.post({
          url: `https://maker.ifttt.com/trigger/${argv.ifttt_event}/with/key/${argv.ifttt_key}`,
          form: {"value1": output_file_name}},
          function (err, httpResponse, body) {
            console.log("Response:", body);
            if (err) {
              console.error(err);
            }
          });
      }
    }
  })
  .on('error', function(err) {
    // handle error
    console.error(err)
  });

  stream.pipe(output_stream);
})