const { articles } = require('../../models')

module.exports = {
  browse: (req, res) => {
    let id = req.params.id
    articles.findOne({
      where: {
        id: id
      }
    }).then(result => {
      res.status(200).send(result)
    })
  }
}