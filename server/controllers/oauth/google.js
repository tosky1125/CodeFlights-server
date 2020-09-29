const {
  users
} = require('../../models')
const {
  OAuth2Client
} = require('google-auth-library');
const user = require('../user');

module.exports = {
  post: (req, res) => {
    const client = new OAuth2Client("956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com");
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.tokenId,
        audience: "956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const { email, name } = payload
      let session = req.session

      users.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: 'google',
          username: name
        }
      }).then(async ([user, exist]) => {
        data = { user : user, exist : exist}
        session.userid = user.id
        if (!exist) {
          
          return res.status(200).send(JSON.stringify({status : true}))
        }
        
        res.status(200).send(JSON.stringify({data}))
      })
    }
    verify().catch(console.error);
  }
  
}