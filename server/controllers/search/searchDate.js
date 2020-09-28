const moment = require('moment');

module.exports = {
    get: (req, res) => {
        // case: query string is departure and arrival 
        if(req.query.departure && req.query.arrival) {
            let departureWithSch = moment().add(Number(req.query.departure), 'd').format('YYYYMMDDHHmm');
            let arrivalWithSch = moment().add(Number(req.query.departure) + Number(req.query.arrival), 'd').format('YYYYMMDDHHmm');
            req.session.departureDate = departureWithSch;
            req.session.arrivalDate = arrivalWithSch;

            if (req.session.departureDate && req.session.arrivalDate) {
                // if sessions are sended, send status 301 and redirect to 'url.com/search/result'
                res.status(301).redirect('/search/result');
            } else {
                // if sessions are not sended, send status 404 with error message
                res.status(404).send('error : invalid request: lack of session');
            }
        }
    }
}