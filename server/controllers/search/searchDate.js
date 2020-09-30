const moment = require('moment');
const searchNation = require('./searchNation');
module.exports = {
    post: (req, res) => {
        // post's body check 
        console.log(req.body);
        // if (!req.body.arrivalDate || req.body.departureDate) {
        //     res.status(404).send({error: 'fullfill all requirement'});
        // } else {
        //     let departureDate = req.body.departureDate;
        //     let arrivalDate = req.body.arrivalDate;

        //     let departureWithSch = moment().add(Number(departureDate), 'd').format('YYYYMMDDHHmm');
        //     let arrivalWithSch = moment().add(Number(departureDate) + Number(arrivalDate), 'd').format('YYYYMMDDHHmm');

        //     // making session
        //     req.session.departureDate = departureWithSch;
        //     req.session.arrivalDate = arrivalWithSch;

        //     // session check
        //     if (!req.session.departureDate || !req.session.arrivalDate) {
        //         res.status(404).send({error: 'sessions are not set yet'});
        //     } else {
        //         searchNation.get(req);
        //     }
        // }
    }
	// console.log(`query : ${req.query}`);
    //     // case: query string is departure and arrival 
    //     if (!req.query.departureDate || !req.query.arrivalDate) {
    //         res.status(404).send({error: 'fullfill all requried query string'})
    //     } else {
    //         let departureWithSch = moment().add(Number(req.query.departureDate), 'd').format('YYYYMMDDHHmm');
    
    //         let arrivalWithSch = moment().add(Number(req.query.departureDate) + Number(req.query.arrivalDate), 'd').format('YYYYMMDDHHmm');
    //         console.log(departureWithSch, arrivalWithSch);
    //         req.session.departureDate = departureWithSch;
    //         req.session.arrivalDate = arrivalWithSch;

    //       console.log(`this is ${req.session}`)
    //         // if sessions are sended, send status 301 and redirect to 'url.com/search/result'
    //         if (req.session.departureDate && req.session.arrivalDate) {
               
    //            res.redirect('http://codeflights.me-s3-5.s3-website.ap-northeast-2.amazonaws.com/search/result');
    //           // if sessions are not sended, send status 404 with error message
    //         } else {
    //             res.status(404).send({error: 'sessions are not set yet'});
    //         }
    //     }
    // }
}
