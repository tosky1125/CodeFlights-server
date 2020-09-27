const moment = require('moment');
const { flights } = require('../../models');



module.exports = {
    get: (req, res) => {
        // case: query string is departure and arrival 
        if(req.query.departure && req.query.arrival) {
            let departureWithSch = moment().add(Number(req.query.departure), 'd').format('YYYYMMDDHHmm');
            req.session.departure = departureWithSch;
            flights.findAll({
                raw: true
            }).then(result => {
                // push specific arguments to empty array 
                let nations = [];
                result.map(arg => {
                    if (Number(arg.estTime) > Number(departureWithSch) && Number(arg.schTime) > Number(departureWithSch)) {
                        nations.push({nations: arg.portName, code: arg.portCode});
                    }
                })
                // sort redunants 
                let flag = {};
                let filteredNations = nations.filter(arg => {
                    if (flag[arg.code]) {
                        return false;
                    }
                    flag[arg.code] = true;
                    return true;
                });
                res.send(filteredNations);
            })
        }
    }
}