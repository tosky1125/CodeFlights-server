const {
  likes
} = require('../../models/')

module.exports = {
  post: (req, res) => {
    const articleId = req.params.id
    const userId = req.session.userId
    console.log(articleId, userID)
    likes.findOrCreate({
      where: {
        userID : userId,
        articleID : articleId
      }
    }).then(([number, exist]) =>{
      if(!exist){
        likes.destroy({
          where : {
            userID : userId,
            articleID : articleId
          }
        })
      } 
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