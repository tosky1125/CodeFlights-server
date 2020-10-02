const { articles } = require('../../models')

module.exports = {
  write: (req, res) => {
    
	  let { author , title, content } = req.body
    articles.create({ author : author, title : title, contents : content}).then(result => {
      res.status(201).send(JSON.stringify({status : true}))
    })
  }
}
