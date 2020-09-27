const moment = require('moment');
const { flights } = require('../../models');

module.exports = {
    get: (req, res) => {
        // case: query string is departure and arrival 
        if(req.query.departure && req.query.arrival) {
            let departureWithSch = moment().add(Number(req.query.departure), 'd').format('YYYYMMDDHHmm');
            let arrivalWithSch = moment().add(Number(req.query.departure) + Number(req.query.arrival), 'd').format('YYYYMMDDHHmm');
            req.session.departureDate = departureWithSch;
            req.session.arrivalDate = arrivalWithSch;
            console.log(req.session);
            res.send({status: true});
        }
    }
}