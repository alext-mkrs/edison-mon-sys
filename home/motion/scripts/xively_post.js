//Command-line arguments
// args[0] is either "start" or "stop" denoting
// beginning and end of the "motion detected" event 
var args = process.argv.slice(2);

// This is to display a nice step-up and -down graph in Xively
var values = [];
switch(args[0]) {
  case 'start':
    values[0] = "0";
    values[1] = "1";
    break;
  case 'stop':
    values[0] = "1";
    values[1] = "0";
    break;
  default:
    throw new Error("Please specify 'start' or 'stop' as a script argument");
}

var payload_ts_1 = new Date();
var payload_ts_2 = new Date();
payload_ts_1.setSeconds(payload_ts_2.getSeconds()-1);

var payload = {
  "version": "1.0.0",
  "datastreams": [{
    "id": "motion_detected",
    "datapoints": [
      {"at": payload_ts_1.toJSON(), "value": values[0]},
      {"at": payload_ts_2.toJSON(), "value": values[1]}
    ]
  }]
};

// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("<YOUR_TEMBOO_USERNAME>", "<YOUR_TEMBOO_APPNAME>", "<YOUR_TEMBOO_APPKEY>");

var Xively = require("temboo/Library/Xively/ReadWriteData");

var writeDataChoreo = new Xively.WriteData(session);

// Instantiate and populate the input set for the choreo
var writeDataInputs = writeDataChoreo.newInputSet();

// Set inputs
writeDataInputs.set_FeedID("<YOUR_XIVELY_FEED_ID>");
writeDataInputs.set_APIKey("<YOUR_XIVELY_API_KEY>");
writeDataInputs.set_FeedType("json");
writeDataInputs.set_FeedData(JSON.stringify(payload));

// Run the choreo, specifying success and error callback handlers
writeDataChoreo.execute(
    writeDataInputs,
    function(results){console.log("Posted '" + args[0] + "' status to Xively successfully, HTTP code: " + results.get_ResponseStatusCode());},
    function(error){console.log(error.type); console.log(error.message);}
);

