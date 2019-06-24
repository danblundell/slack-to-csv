const fastcsv = require('fast-csv'); 
const fs=require("fs");
const ws = fs.createWriteStream("slackCSVHere/channels.csv");

let file = JSON.parse(fs.readFileSync('slackDataHere/channels.json', 'utf8'));
let data = [];

for(obj in file){
    let channel = file[obj];

    data.push({
        name: channel.name,
        number_of_members: channel.members.length,
        purpose: channel.purpose.value,
        topic: channel.topic.value,
        is_archived: channel.is_archived,
    });
}

fastcsv.write(data, { headers: true }).pipe(ws);