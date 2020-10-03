const { articles } = require('../../models')

module.exports = {
  write: (req, res) => {
    let { title, content } = req.body
    let author = req.session.usernme;
    
    articles.create({ author : author, title : title, contents : content}).then(result => {
      res.status(201).send(JSON.stringify({status : true}))
    })
  }
}
