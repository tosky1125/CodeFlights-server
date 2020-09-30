const { query } = require('express');

module.exports = {
    parsePost : async (query) => {
        const axios = require('axios');
        // 국가명만 query 로 넣는 경우, 여행을 제외한 정보들이 같이 오기 때문에 뒤에 "여행" 을 붙여 URI 를 만들었음
        let queryString = encodeURI(query+"view point"); 
        let result = await axios({
            method: 'get',
            url: `https://openapi.naver.com/v1/search/blog.json?query=${queryString}`,
            headers: {
                // client 의 headers 정보 commit 전에 process.env 나 dotenv 로 갈아엎어야 할 듯... 
                'X-Naver-Client-Id': 'MyheUeWlOZ48Hc2WSPns',
                'X-Naver-Client-Secret': 'HqceBdNATi'
            }
        });
        // 기본적으로 블로그 글에 10개를 보냅니다
        let postings = result.data.items.map(arg => {
            // 우리가 작성한 글을 저장하여 DB에서 불러오는 경우 -> id 까지 전부 보내준다
            // 블로그 글을 Api 를 통해 받아온 경우 -> id: n 을 주고 보내준다
            return ({id: 'n', title: arg.title.replace(/<\/?[^>]+(>|$)/g, ""), link: arg.link, contents: arg.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 30)+'...'})
        });
        return postings;
    },
    parseImage : async (query) => {
        const axios = require('axios');
        // 국가명만 query 로 넣는 경우, 여행을 제외한 정보들이 같이 오기 때문에 뒤에 "여행" 을 붙여 URI 를 만들었음
        let queryString = encodeURI(query+" 공항"); 
        let result = await axios({
            method: 'get',
            url: `https://openapi.naver.com/v1/search/image?query=${queryString}&display=1`,
            headers: {
                // client 의 headers 정보 commit 전에 process.env 나 dotenv 로 갈아엎어야 할 듯... 
                'X-Naver-Client-Id': 'MyheUeWlOZ48Hc2WSPns',
                'X-Naver-Client-Secret': 'HqceBdNATi'
            }
        });
        // 이미지는 여행지 당 한 개만 찾습니다
        console.log(result.data.items);
        // let imgLink = result.data.items
    }
};