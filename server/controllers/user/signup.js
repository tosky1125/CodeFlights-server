const { users }= require('../../models');

module.exports = {
  post: (req, res) => {
    const {
      email,
      username,
      password
    } = req.body;

    users.findOrCreate({
      where: {
        email: email
      },
      defaults: {
        password: password,
        username: username
      }
    }).then(async ([user, exist]) => {
      if (!exist) {
        return res.status(409).send(JSON.stringify({
          status: false
        }))
      } 
      res.status(200).send(JSON.stringify({
        status : true
      }))
    })
  }
}