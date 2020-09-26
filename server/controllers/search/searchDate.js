const { flights } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    get: (req, res) => {
        // console.log(req.params);
        let date = req.params.dateparams.split('=') 
        let departure = Number(date[0]);
        let arrival = Number(date[1]);

        let today = new Date();
        // let todayString = `${today.getFullYear()}0${today.getMonth()+1}${today.getDate()}${today.getHours()}${String(today.getMinutes()).length === 2? today.getMinutes() : '0' + String(today.getMinutes())}`
        let departureDateString = `${today.getFullYear()}${String(today.getMonth() + 1).length === 2? today.getMonth() + 1 : '0' + String(today.getMonth() + 1)}${String(today.getDate() + departure).length === 2? today.getDate() + departure : '0' + String(today.getDate() + departure)}${String(today.getHours()).length === 2? today.getHours() : '0' + String(today.getHours())}${String(today.getMinutes()).length === 2? today.getMinutes() : '0' + String(today.getMinutes())}`
        // let departureDateString = String(Number(todayString) + Number(departure));
        let arrivalDateString = `${today.getFullYear()}${String(today.getMonth() + 1).length === 2? today.getMonth() + 1 : '0' + String(today.getMonth() + 1)}${String(today.getDate() + departure + arrival).length === 2? today.getDate() + departure + arrival : '0' + String(today.getDate() + departure + arrival)}${String(today.getHours()).length === 2? today.getHours() : '0' + String(today.getHours())}${String(today.getMinutes()).length === 2? today.getMinutes() : '0' + String(today.getMinutes())}`

        console.log(`departure: ${departureDateString}, arrival: ${arrivalDateString}`);

        // // 전체 항공정보를 가져오는 API
        // flights.findAll({
        //     // limit: 10,
        //     raw: true
        // }).then(result => {
        //     let filtered = [];
        //     result.map(arg => {
        //         if (Number(arg.estTime) > Number(departureDateString)) {
        //             filtered.push(arg);
        //         }
        //     });
        //     res.send(filtered);
        // });

        // 날짜와 행선지만을 가져오는 API
        flights.findAll({
            raw: true
        }).then(result => {
            let nations = [];
            result.map((arg) => {
                if (Number(arg.estTime) > Number(departureDateString)) {
                    nations.push({nation: arg.portName, code: arg.portCode, departure: arg.estTime});
                }
            });
            let flag = {};
            let filterNations = nations.filter(arg => {
                if (flag[arg.code]) {
                    return false;
                }
                flag[arg.code] = true;
                return true;
            });
            console.log(filterNations);
            res.send(filterNations);
        });
        
        
        // flights.findAll().then(result => (result.filter(arg => {
        //     Number(arg.estTime) > Number(departureDateString) && 
        //     Number(arg.schTime) > Number(departureDateString)
        // }))).then(filtered => console.log(filtered));
    }
    
}