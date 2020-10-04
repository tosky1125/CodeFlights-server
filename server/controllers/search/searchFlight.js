const moment = require('moment');
const { flights } = require('../../models');
const { articles } = require('../../models');
const { Op } = require("sequelize");
const axios = require('axios');
const blog = require('./searchBlog');
const parsePost = blog.parsePost;
const searchPrice = require('./searchPrice');
const getPrice = searchPrice.getPrice;
const dateHandler = require('./dateHandler');
const handlingDate = dateHandler.handlingDate;

module.exports = {
    post: async (req, res) => {

	    // session check
        if (!req.session.departureDate || !req.session.arrivalDate) {
	 	res.status(404).send({error: 'there is no needed session'});
        } 
        else {

        // date from session
         let departure = req.session.departureDate;
         let arrival = req.session.arrivalDate;

        // dummy data 
        // let departure = moment().add(3, 'd').format('YYYYMMDDHHmm');;
        // let arrival = 202010050853;
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
                    if (Number(arg.estTime) - departure > 0 && 
                        Number(arg.schTime) - departure > 0) {
                        availableFlights.push({
                            city: arg.portName,
                            carrier: arg.airName,
                            carrierNo: arg.airID,
                            carrierLogo: arg.logo,
                            departure: handlingDate(arg.estTime),
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
     }
  }
}
