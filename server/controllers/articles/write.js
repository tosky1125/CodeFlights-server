const { articles } = require('../../models')

module.exports = {
  write: (req, res) => {
    let { author , title, contents } = req.body
    articles.create({ author : author, title : title, contents : contents}).then(result => {
      res.status(201).send(JSON.stringify({status : true}))
    })
  }
}