const fastcsv = require('fast-csv'); 
const fs = require("fs");
const path = require('path');
var argv = require('minimist')(process.argv.slice(2),opts={ '--': true }); // sanitise command line args

if (argv._.length <1) { 
    return console.error("👎  At least one channel name should be supplied. Just add a list of channels as arguments.");
}
else {
    argv._.forEach((channel) => {
        const directoryPath = path.join(__dirname, `slackDataHere/${channel}`);
        let data = [];
        
        fs.readdir(directoryPath, function (err, files) {
            //handling some annoying errors about dir scanning
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            // loop through daily files from slack export
            for(file in files) {
                let parsedJSON = JSON.parse(fs.readFileSync(`${directoryPath}/${files[file]}`, 'utf8'));

                // create message structure
                // TODO: sanitise the messages replacing user ids with usernames etc...
                parsedJSON.forEach((message) => {
                    data.push({
                        datetime: message.ts, 
                        message_id: message.client_msg_id,
                        text: message.text,
                        type: message.type,
                    });
                });
            };

            // TODO: do something better here than write to once to the csv
            const ws = fs.createWriteStream(`slackCSVHere/${channel}.csv`);
            fastcsv.write(data, { headers: true }).pipe(ws);
        });
    });
}