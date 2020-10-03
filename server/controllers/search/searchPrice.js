const axios = require('axios');
const moment = require('moment');
// 시간이 24시간 넘어가면, 날짜단위로!
let getPrice = async(arg) => {
    let result = await axios({
        method: "get",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/KR/KRW/Sko-KR/ICN-sky/${arg.portCode}-sky/anytime`,
        headers: {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "828ee52f33msh960e608c7004ddbp1a0d47jsnc08e116a1e39",
            "useQueryString": true
        }    
    });
    if(result.data.Quotes.length !== 0){
        let totalPrice = result.data.Quotes.reduce((accum, curr) => {
            return accum + curr.MinPrice;
        }, 0);
        console.log(`totalPrice: ${totalPrice}, ticketCount: ${result.data.Quotes.length}`);
        let avgPrice =  Math.round(totalPrice / result.data.Quotes.length);
        let avgPriceWithFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'KRW'
        }).format(avgPrice);
        return avgPriceWithFormat;
    } else {
        return null;
    }
};

module.exports = { getPrice };