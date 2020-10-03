const moment = require('moment');

let handlingDate = (date) => {
    let diff = moment().diff(moment([date.substring(0, 4), date.substring(4, 6)-1, date.substring(6, 8), date.substring(8, 10), date.substring(10, 12)]), 'minutes');
    // console.log(`출발일: ${date}, 출발일로부터의차이: ${diff}`);
    if (diff > 0) {
        return '이미 출발한 항공편입니다'
    } else {
        if (diff / -60 > 24) {
            diff = diff * -1
            let day = Math.floor(diff/(60*24));
                let dayAccm = day * (60*24);
            let hour = Math.floor((diff - dayAccm)/60);
                let hourAccm = hour * 60;
            let minutes = diff - dayAccm - hourAccm;
            if (minutes === 0) {
                return `${day}일 ${hour}시간 전`; 
            } else {
                return `${day}일 ${hour}시간 ${minutes}분 전`;
            }
        } else {
            let hour = Math.floor(diff/60);
                let hourAccm = hour * 60;
            let minutes = diff - hourAccm;
            if (minutes === 0) {
                return `${day}일 ${hour}시간 전`; 
            } else {
                return `${hour}시간 ${minutes}분 전`
            }
        }
    }
}

module.exports = { handlingDate };