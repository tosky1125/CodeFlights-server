module.exports = {
    // set cookies about departure and arrival date
    searchDate : require('./searchDate'),
    // search available nations based on result of searchDate
    searchNation : require('./searchNation'),
    // search available flights based on result of searchDate
    searchFlight : require('./searchFlight')
}