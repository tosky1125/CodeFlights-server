const moment = require('moment');
const { flights } = require('../../models');
const { articles } = require('../../models');
const { Op } = require("sequelize");
const axios = require('axios');
const blog = require('./blog');
const parsePost = blog.parsePost;

module.exports = {
    get: async (req, res) => {
        // session check
        if (!req.session.departureDate || !req.session.arrivalDate) {
            res.status(404).send("invalid request");
        } 
        else {
            // date from session
            let departure = req.session.departure;
            let arrival = req.session.arrival;

            // // dummy data
            // let departure = 202009290000;
            // let arrival = 202010100000;
            
            let flightsAndPosting = {};
            let availableFlights = [];
            let positngFromBlog = [];
            let postingFromDB = [];

            // queryString check 
            if (!req.query.destination) {
                res.stauts(404).send('invalid request');
            } else {
                // finding flights
                let cityKor = req.query.destination;
                let flightsList = await flights.findAll({
                    where: {portName: {[Op.substring]: cityKor}},
                    raw: true
                });
                if (flightsList.length === 0) {
                    flightsAndPosting.flights = null;
                } else {
                    flightsList.map(arg => {
                        // console.log(arg)
                        if(arg.portName.includes('/')) {
                            arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
                        }
                        if (Number(arg.estTime) > departure && Number(arg.estTime) < arrival &&
                            Number(arg.schTime) > departure && Number(arg.schTime) < arrival) {
                            availableFlights.push({
                                city: arg.portName,
                                carrier: arg.airName,
                                carrierNo: arg.airID,
                                departure: moment(arg.estTime, 'YYYYMMDDHHmm').format("YYYY년 MM월 DD일 HH시 MM분")
                            });
                        }
                    });
                    flightsAndPosting.flights = availableFlights;
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
                if (articlesFromDB.length = 0) {
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