const axios = require('axios');
const moment = require('moment');
const timeZone = require('moment-timezone');
const searchTimeZone = require('./searchTimeZone')['searchTimeZone'];

let searchTime = async(iataCode) => {
    let result = await axios({
        method: 'get',
        url: 'http://aviation-edge.com/v2/public/routes',
        params: {
            key: 'b8c24b-4ea0b5',
            departureIata: 'ICN',
            arrivalIata: iataCode
        }
    });
    let timeZoneResult = await searchTimeZone(iataCode);
    
    result = result.data[0];
    console.log(result);
    let departureTime = moment(result.departureTime, 'hh:mm:ss');
    let arrivalTime = moment(result.arrivalTime, 'hh:mm:ss');
    let estTime = departureTime.diff(arrivalTime, "minutes");
    
    estTime = Math.abs(estTime);

    if (estTime / 60 > 0) {
        let hour = Math.floor(estTime/60);
        let hourAccm = hour*60;
        let minutes = estTime - hourAccm;

        if (minutes === 0) {
            console.log(`비행시간: ${hour}시간`)
            return `${hour}시간 소요` 
        } else {
            console.log(`비행시간: ${hour}시간 ${minutes}분`)
            return `${hour}시간 ${minutes}분 소요`
        }
    } else {
        console.log(`비행시간: ${estTime}분`)
        return `${estTime}분 소요`
    }
}

searchTime("YVR");