const axios = require('axios');
const db = require('./models')
const iata = db.iata
const key = "kMOXg%2FkJI9XYBYuoFjxNKhEkNgV1ncASqJhXtSXpxebRC%2Fnr3Iq%2BMOIj4CIfgsDQqGad7GQGZOjbr98Wc88ulA%3D%3D"
// let pageNo = 1
// let getIATA = (pageNo) => 
// axios({
//     method: "get",
//     url: `http://openapi.airport.co.kr/service/rest/AirportCodeList/getAirportCodeList?ServiceKey=${key}&pageNo=${pageNo}`
// }).then(res => {
//     let eachContainer = {}
//     res.data.response.body.items.item.map(arg => {
//         eachContainer[arg.cityCode] = arg.cityKor;
//         container.push(eachContainer);
//     });
//     console.log(container);
// });

// for (let page = 1; page < 137; page ++) {
//     axios({
//         method: "get",
//         url: `http://openapi.airport.co.kr/service/rest/AirportCodeList/getAirportCodeList?ServiceKey=${key}&pageNo=${page}`
//     }).then(res => {
//         res.data.response.body.items.item.map(arg => {
//             cities.create({
//                 cityCode: arg.cityCode,
//                 cityName: arg.cityEng
//             })
//             // arg.cityCode, arg.cityKor])
//         });
//     });
// };

// const page=1;
// axios({
//     method: "get",
//     url: `http://openapi.airport.co.kr/service/rest/AirportCodeList/getAirportCodeList?ServiceKey=${key}&pageNo=${page}`
// }).then(res => {
//     res.data.response.body.items.item.map(arg => {
//         iata.create({
//             cityNameEng: arg.cityEng,
//             cityNameKor: arg.cityKor,
//             cityCode: arg.cityCode
//         })
//     })
// });

iata.findAll().then(res => console.log(res));

