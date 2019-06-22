const fs = require('fs');
const moment = require('moment');
const statsFile = 'server/db/stats.json';

let date = moment().format('MMMM Do YYYY, h:mm:ss a');

let stats = (action, prod) => {
    fs.readFile(statsFile, 'utf-8', (err, data) => {
        let logs = JSON.parse(data);
        logs.push({date: date, prod_name: prod, action: action});
        fs.writeFile(statsFile, JSON.stringify(logs, null, 4), (err) => {
            if (err) return
        })
    })
};

module.exports = stats;