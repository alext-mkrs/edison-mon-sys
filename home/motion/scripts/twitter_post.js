//Command-line arguments
// After that args[0] is a timestamp passed from Motion
var args = process.argv.slice(2);

// You'll need a single TembooSession object in your code, eg:
var tsession = require("temboo/core/temboosession");
var session = new tsession.TembooSession("<YOUR_TEMBOO_USERNAME>", "<YOUR_TEMBOO_APPNAME>", "<YOUR_TEMBOO_KEY>");

var Twitter = require("temboo/Library/Twitter/Tweets");

var statusesUpdateChoreo = new Twitter.StatusesUpdate(session);

// Instantiate and populate the input set for the choreo
var statusesUpdateInputs = statusesUpdateChoreo.newInputSet();

// Set inputs
statusesUpdateInputs.set_AccessToken("<YOUR_TWITTER_ACCESS_TOKEN>");
statusesUpdateInputs.set_AccessTokenSecret("<YOUR_TWITTER_ACCESS_TOKEN_SECRET>");
statusesUpdateInputs.set_ConsumerSecret("<YOUR_TWITTER_CONSUMER_SECRET>");
statusesUpdateInputs.set_ConsumerKey("<YOUR_TWITTER_CONSUMER_KEY>");
statusesUpdateInputs.set_StatusUpdate("Motion detected at " + args[0]);

statusesUpdateInputs.addOutputFilter("tweet_id", "/id_str", "Response")

// Run the choreo, specifying success and error callback handlers
statusesUpdateChoreo.execute(
    statusesUpdateInputs,
    function(results){console.log("Posted note to Twitter, message ID is: " + results.getResult("tweet_id"));},
    function(error){console.log(error.type); console.log(error.message);}
);

