const moment = require('moment');
const { flights } = require('../../models');
const { Op } = require("sequelize");



module.exports = {
    get: async (req, res) => {
        // // session check 
        // if (!req.session.departureDate || !req.session.arrivalDate) {
        //     res.status(404).send("invalid request");
        // }
        // // if departure and arrival date are in session
        // let departure = req.session.departureDate;
        // let arrival = req.session.arrivalDate;
        let departure = 202009290000;
        let arrival = 202010100000;
        let uniq = {};
        let nations = await flights.findAll({
            attributes: ['portName', 'estTime', 'schTime'],
            raw: true
        });
        let filterdByTime = [];
        nations.map(arg => {
            // if portName has '/', slice only city name from it
            if(arg.portName.includes('/')) {
                arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
            }
            // then sorted by date from session's departure and arrival 
            if (Number(arg.estTime) > departure && Number(arg.estTime) < arrival &&
                Number(arg.schTime) > departure && Number(arg.schTime) < arrival) {
                filterdByTime.push({ destination: arg.portName});
            }
        })
        let filterDuplicate = filterdByTime.filter(obj => !uniq[obj.destination] && (uniq[obj.destination] = true))
        console.log(filterDuplicate);
        res.send(filterDuplicate);


        // if (req.session.departureDate && req.session.arrivalDate) {
        //     let nations = await flights.findAll({
        //         attributes: ['portName'],
        //         raw: true
        //     });
        //     console.log(nations);
        //     res.end();
        // }
    }
}