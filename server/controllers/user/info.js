const { users }= require('../../models');

module.exports = {
  get: (req, res) => {
    const session = req.session;
    console.log(session)
	  users.findOne({
      where: {
        id: session.userid
      }
    }).then(result => {
	    console.log(result)
      if (result) {
        return res.status(200).send(JSON.stringify({
          email: result.email,
          username: result.username
        }))
      }
      res.status(401).send(JSON.stringify({
        status: false
      }))
    })
  },
  post: (req, res) => {
    const {
      username,
      password
    } = req.body;
    const session = req.session.userid;
    users.update({
      username: username,
      password: password
    },{
      where: {
        id: session
      }
    }).then(
      result => {
        if (result) {
          return res.status(202).send(JSON.stringify({
            status: true
          }))
        }
        res.status(400).send(JSON.stringify({
          status: false
        }))
      }
    )
  }
}
