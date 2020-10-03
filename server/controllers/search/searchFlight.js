const moment = require('moment');
const { flights } = require('../../models');
const { articles } = require('../../models');
const { Op } = require("sequelize");
const axios = require('axios');
const blog = require('./searchBlog');
const parsePost = blog.parsePost;
const searchPrice = require('./searchPrice');
const getPrice = searchPrice.getPrice;

/**
 * 기존: searchDate -> searchNation 으로 session check 를 통해 넘어가고 redirection
 * 현재: 
 *      departureDate, arrivalDate 를 body 안에 넣어서(type: integer) POST 를 보내줌
 *      그리고 해당 날짜를 기준으로 바로 항공편을 찾아줌 (searchDate 는 필요없음)
 */
module.exports = {
    post: async (req, res) => {

	    // session check
    //    if (!req.session.departureDate || !req.session.arrivalDate) {
	// 	res.status(404).send({error: 'there is no needed session'});
    //    } 
    //    else {
        // date from session
        // let departure = req.session.departureDate;
        // let arrival = req.session.arrivalDate;
        // dummy data
        let departure = 202010030853;
        let arrival = 202010050853;
        let flightsAndPosting = {};
        let availableFlights = [];
        let positngFromBlog = [];
        let postingFromDB = [];

        // queryString check 
        if (!req.body.city) {
            res.status(404).send({error: 'there is no query string'});
        } else {
            // finding flights
            console.log(`payload: ${req.body.city}`);
            let cityKor = req.body.city;
            let flightsList = await flights.findAll({
                where: {portName: {[Op.substring]: cityKor}},
                raw: true
            });
            if (flightsList.length === 0) {
                flightsAndPosting.flights = null;
            } else {
                flightsList.map(arg => {
                    
                    if(arg.portName.includes('/')) {
                        arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
                    }
                    if (Math.abs(Number(arg.estTime) - departure) > 10000 || 
                        Math.abs(Number(arg.schTime) - departure) > 10000) {
                        let diff = moment().diff(moment([arg.estTime.substring(0, 4), arg.estTime.substring(4, 6)-1, arg.estTime.substring(6, 8), arg.estTime.substring(8, 10), arg.estTime.substring(10, 12)]), 'minutes');
                        availableFlights.push({
                            city: arg.portName,
                            carrier: arg.airName,
                            carrierNo: arg.airID,
                            carrierLogo: arg.logo,
                            departure: diff > 0? `이미 출발한 항공편입니다` : `${Math.floor(diff/-60)}시간 ${-1*diff%-60}분 전`,
                            portCode: arg.portCode,
                        });
                    }
                });
                flightsAndPosting.flights = availableFlights;
                flightsAndPosting.estPrice = await getPrice(availableFlights[availableFlights.length-1]);
            }
            // parse blog posting
            let blogPostings = await parsePost(cityKor);
            blogPostings.map(arg => {
                positngFromBlog.push(arg);
            });
            flightsAndPosting.blogPostings = positngFromBlog;
            
            // getting articles from DB
            let articlesFromDB = await articles.findAll({
                where: {title: {[Op.substring]: cityKor}},
                raw: true
            });
            if (articlesFromDB.length === 0) {
                flightsAndPosting.userPostings = null;
                res.send(flightsAndPosting);
            } else {
                articlesFromDB.map(arg => {
                    postingFromDB.push(arg);
                });
                flightsAndPosting.userPostings = articlesFromDB;
                res.send(flightsAndPosting);
            }
        }
    // }
  }
}
