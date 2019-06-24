const fastcsv = require('fast-csv'); 
const fs = require("fs");
const path = require('path');
var argv = require('minimist')(process.argv.slice(2),opts={ '--': true });

if (argv._.length <1) { 
    return console.error("👎  At least one channel name should be supplied");
}
else {
    argv._.forEach((channel) => {
        const directoryPath = path.join(__dirname, `slackDataHere/${channel}`);
        let data = [];
        
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            for(file in files) {
                // Do whatever you want to do with the file
                let parsedJSON = JSON.parse(fs.readFileSync(directoryPath + '/' +files[file], 'utf8'));
                console.log(parsedJSON);

                parsedJSON.forEach((message) => {
                    data.push({
                        datetime: message.ts, 
                        message_id: message.client_msg_id,
                        text: message.text,
                        type: message.type,
                    });
                });
            };

            const ws = fs.createWriteStream(`slackCSVHere/${channel}.csv`);
            fastcsv.write(data, { headers: true }).pipe(ws);
        });
    });
}