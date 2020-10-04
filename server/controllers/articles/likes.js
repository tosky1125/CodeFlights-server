const {
  likes
} = require('../../models/')

module.exports = {
  post: (req, res) => {
    const articleId = req.params.id
    const userId = req.session.userid
    let like = true;
    likes.findOrCreate({
      where: {
        userID : userId,
        articleID : articleId
      }
    }).then(([number, exist]) =>{
      if(!exist){
	like = false;
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
	      console.log(data);
        res.status(201).send({likes : data, like : like})
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
