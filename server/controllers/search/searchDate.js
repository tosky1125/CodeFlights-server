const moment = require('moment');

module.exports = {
    get: (req, res) => {
	console.log(req.query);
        // case: query string is departure and arrival 
        if (!req.query.departureDate || !req.query.arrivalDate) {
            res.status(404).send({error: 'fullfill all requried query string'})
        } else {
            let departureWithSch = moment().add(Number(req.query.departureDate), 'd').format('YYYYMMDDHHmm');
    
            let arrivalWithSch = moment().add(Number(req.query.departureDate) + Number(req.query.arrivalDate), 'd').format('YYYYMMDDHHmm');
            console.log(departureWithSch, arrivalWithSch);
            req.session.departureDate = departureWithSch;
            req.session.arrivalDate = arrivalWithSch;

            // if sessions are sended, send status 301 and redirect to 'url.com/search/result'
            if (req.session.departureDate && req.session.arrivalDate) {
                res.redirect(301, '/search/result');
              // if sessions are not sended, send status 404 with error message
            } else {
                res.status(404).send({error: 'sessions are not set yet'});
            }
        }
    }
}
