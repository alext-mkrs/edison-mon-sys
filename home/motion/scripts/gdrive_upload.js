var fs = require("fs");

//Command-line arguments
var args = process.argv.slice(2);

fs.readFile(args[0], function(err,data) {
  if (err) throw err;

  var path = require("path");
  var filename = path.basename(args[0]);

  // You'll need a single TembooSession object in your code, eg:
  var tsession = require("temboo/core/temboosession");
  var session = new tsession.TembooSession("<YOUR_TEMBOO_USERNAME>", "<YOUR_TEMBOO_APPNAME>", "<YOUR_TEMBOO_APPKEY>");

  var Google = require("temboo/Library/Google/Drive/Files");

  var insertChoreo = new Google.Insert(session);

  // Instantiate and populate the input set for the choreo
  var insertInputs = insertChoreo.newInputSet();

  // Set inputs
  insertInputs.set_ClientID("<YOUR_GOOGLE_API_CLIENTID>");
  insertInputs.set_ClientSecret("<YOUR_GOOGLE_API_CLIENT_SECRET>");
  insertInputs.set_RefreshToken("<YOUR_GOOGLE_API_REFRESH_TOKEN>");
  insertInputs.set_RequestBody('{"title": "' + filename + '"}');
  insertInputs.set_FileContent(data.toString("base64"));
  insertInputs.set_ContentType("image/jpg");

  insertInputs.addOutputFilter("view_link", "/alternateLink", "Response")

  // Run the choreo, specifying success and error callback handlers
  insertChoreo.execute(
    insertInputs,
    function(results){console.log("Posted file to Google Drive, view link is: " + results.getResult("view_link"));},
    function(error){console.log(error.type); console.log(error.message);}
  );
});
