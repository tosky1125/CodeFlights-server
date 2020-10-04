const moment = require('moment');
const { flights } = require('../../models');
const { iata } = require('../../models');

/**
 * 기존: searchDate -> searchNation 으로 session check 를 통해 넘어가고 redirection
 * 현재: 
 *      departureDate, arrivalDate 를 body 안에 넣어서(type: integer) POST 를 보내줌
 *      그리고 해당 날짜를 기준으로 바로 항공편을 찾아줌 (searchDate 는 필요없음)
 *      session 은 searchNation 
 *      search/result 로 post 를 날림
 *      -> departureDate, arrivalDate 를 body 안에 넣어서(type: integer) POST 를 보내줌
 *      서버에서는 해당 body 의 값들을 통해 여행가능한 지역을 return
 *      + session 은 searchFlight 에서 다시 사용하기에 똑같이 부여해준다 
 */

module.exports = {
    post: async (req, res) => {
        console.log(req.body);
        if (!req.body.departureDate || !req.body.arrivalDate) {
            res.status(404).send({error: "fullfill the requirements"});
        }

        // calculate schedule 
        let departureDate = req.body.departureDate;
        let arrivalDate = req.body.arrivalDate;
        let departureWithSch = moment().add(Number(departureDate), 'd').format('YYYYMMDDHHmm');
        let arrivalWithSch = moment().add(Number(departureDate) + Number(arrivalDate), 'd').format('YYYYMMDDHHmm');
        // making session with schedule
        req.session.departureDate = departureWithSch;
        req.session.arrivalDate = arrivalWithSch;

        // // dummy data
        // let departure = 202009290000;
        // let departure = 202009290000;
        // let arrival = 202010100000;

        let uniq = {};
        let nations = await flights.findAll({
            attributes: ['portName', 'portCode', 'estTime', 'schTime'],
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
            if (Math.abs(Number(arg.estTime) - departureWithSch) < 10000 || 
                Math.abs(Number(arg.schTime) - departureWithSch) < 10000) {
                filterdByTime.push({ destinations: arg.portName, code: arg.portCode });
            }
        })
        console.log(filterdByTime);
        let filterDuplicate = filterdByTime.filter(obj => !uniq[obj.destinations] && (uniq[obj.destinations] = true))
        console.log(filterDuplicate);

        let finalImage = await Promise.all(
                filterDuplicate.map(async (arg) => {
                let findImg = await iata.findOne({
                    where: {airportCode: arg.code},
                    attributes: ['img'],
                    raw: true
                })
                arg.img = findImg.img;
                return arg;
            })
        );
        console.log(finalImage);
        res.send(finalImage);
    }
}
