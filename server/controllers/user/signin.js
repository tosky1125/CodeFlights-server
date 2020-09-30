const { users }= require('../../models'); 

module.exports = {
  post: (req, res) => {
    const {
      email,
      password
    } = req.body;
    let session = req.session
    users.findOne({
      where: {
        email: email,
        password: password
      }
    }).then(result => {
      if (!result) res.status(401).send(JSON.stringify({
        status: false
      }))
      else {
        res.cookie('red','chilli', { sameSite : 'none'})
        console.log(req.cookies.red);
        session.userid = result.id;
        console.log(`this is ${JSON.stringify(session)}`)
	      res.status(201).json({
          id:result.id
        })
      }
    })
  }
}
