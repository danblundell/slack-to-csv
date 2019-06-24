const fastcsv = require('fast-csv'); 
const fs=require("fs");
const ws = fs.createWriteStream("slackCSVHere/users.csv");

let file = JSON.parse(fs.readFileSync('slackDataHere/users.json', 'utf8'));
let data = [];

for(obj in file){
    let user = file[obj];

    data.push({
        name: user.profile.real_name_normalized,
        email: user.profile.email,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name
    });
}

fastcsv.write(data, { headers: true }).pipe(ws);