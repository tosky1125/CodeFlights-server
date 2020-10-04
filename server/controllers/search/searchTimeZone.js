const axios = require('axios');
const { iata } = require('../../models');

let searchTimeZone = async(cityCode) => {
    let result = await axios({
        method: 'get',
        url: 'https://aviation-edge.com/v2/public/cityDatabase',
        params: {
            key: 'b8c24b-4ea0b5',
            codeIataCity: cityCode
        }
    });
    result = result.data;
    console.log(result);   
    return result.timezone;
};

let searchCityCode = async(airportCode) => {
    
}


module.exports = { searchTimeZone };

searchTimeZone("AAA");

