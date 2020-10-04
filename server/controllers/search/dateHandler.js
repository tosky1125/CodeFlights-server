const moment = require('moment');

let handlingDate = (date) => {
    let diff = moment().diff(moment([date.substring(0, 4), date.substring(4, 6)-1, date.substring(6, 8), date.substring(8, 10), date.substring(10, 12)]), 'minutes');
    diff = diff * -1;
    if (diff / 60 > 24) {
        let day = Math.floor(diff/(60*24));
        let dayAccm = day * (60*24);

        let hour = Math.floor((diff - dayAccm)/60);
        let hourAccm = hour * 60;

        let minutes = diff - dayAccm - hourAccm;
        // 시간이 0으로 떨어지는 경우
        if (hour === 0) {
            return `${day}일 ${minutes}분 전`;
        }
        // 분이 0으로 떨어지는 경우
        if (minutes === 0) {
            return `${day}일 ${hour}시간 전`; 
            // 둘 다 아닌 경우 
        } else {
            return `${day}일 ${hour}시간 ${minutes}분 전`;
        }
    } else {
        let hour = Math.floor(diff/60);
            let hourAccm = hour * 60;
        let minutes = diff - hourAccm;

        // 분이 0으로 떨어지는 경우 
        if (minutes === 0) {
            return `${day}일 ${hour}시간 전`; 
            // 그렇지 않은 경우 
        } else {
            return `${hour}시간 ${minutes}분 전`
        }
    }
}

module.exports = { handlingDate };