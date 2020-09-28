const { flights } = require('../../models');

module.exports = {
    get: async (req, res) => {
        // session check 
        if (!req.session.departureDate || !req.session.arrivalDate) {
            res.status(404).send({error: "fullfill the sessions"});
        }
        // if departure and arrival date are in session
        let departure = req.session.departureDate;
        let arrival = req.session.arrivalDate;
        // // dummy data
        // let departure = 202009290000;
        // let arrival = 202010100000;
        let uniq = {};
        let nations = await flights.findAll({
            attributes: ['portName', 'estTime', 'schTime'],
            raw: true
        });
        if (nations.length === 0) {
            res.status(204).send({error: "there is no flights in this schedule"});
        }
        let filterdByTime = [];
        nations.map(arg => {
            // if portName has '/', slice only city name from it
            if(arg.portName.includes('/')) {
                arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
            }
            // then sorted by date from session's departure and arrival 
            if (Number(arg.estTime) > departure && Number(arg.estTime) < arrival &&
                Number(arg.schTime) > departure && Number(arg.schTime) < arrival) {
                filterdByTime.push({ destination: arg.portName });
            }
        })
        let filterDuplicate = filterdByTime.filter(obj => !uniq[obj.destination] && (uniq[obj.destination] = true))
        res.send(filterDuplicate);
    }
}