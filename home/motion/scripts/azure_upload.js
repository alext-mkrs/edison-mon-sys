var fs = require("fs");

//Command-line arguments
var args = process.argv.slice(2);




fs.readFile(args[0], function (err, data) {
        if (err) throw err;

        var path = require("path");
        var filename = path.basename(args[0]);


        var azure = require('azure-storage');

        var blobSvc = azure.createBlobService(<Your Storage account name>, <Your Access Key>);
    

        blobSvc.createContainerIfNotExists(<Your Blob Name>, function (error, result, response) {
            if (!error) {
                    // Container exists and is private
                blobSvc.createBlockBlobFromLocalFile(<Your Blob Name>, filename, args[0], function (error, result, response) {
                    if (!error) {
                        // file uploaded

                        console.log("Posted file " + filename + "  to Azure Blob ");

                    } else {
                        console.log(error.type); console.log(error.message);
                    }
                });
            }
        });
