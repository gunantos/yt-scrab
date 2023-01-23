const db = require('../db');

function get(q) {
    return new Promise((resolve, reject) => {
        db.query(q, function (err, res) {
            if (err) reject(err);
            resolve(JSON.parse(JSON.stringify(res)));
        });
    })
}

module.exports = {
    get
}