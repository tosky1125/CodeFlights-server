const {
  likes
} = require('../../models/')

module.exports = {
  post: (req, res) => {
    const articleId = req.params.id
    const userId = req.session.userId
    likes.findOrCreate({
      where: {
        userId : userId,
        articleId : articleId
      },
      defaults : {
        userId : userId,
        articleId : articleId
      }
    }).then(() =>{
      likes.count({
        where : {
          articleId : articleId
        }
      }).then(data => {
        res.status(201).send({likes : data})
      })
    })
  },
  get : (req, res) => {
    const articleId = req.params.id
    likes.count({
      where : {
        articleId : articleId
      }
    }).then(data => {
      res.status(201).send({likes : data})
    })
  }
}