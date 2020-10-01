const {
  users
} = require('../../models')
const {
  OAuth2Client
} = require('google-auth-library');


module.exports = {
  post: (req, res) => {
    const client = new OAuth2Client("956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com");
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.tokenId,
        audience: "956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      const {
        email,
        name
      } = payload
      let session = req.session
      console.log(payload);
      users.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: 'google',
          username: name
        }
      }).then(async ([user, exist]) => {
        console.log(`this is ${user.id}`)
        session.userid = user.id
        let data = {
          username: user.username,
          email: user.email
        }
        res.status(201).send(data)
      })
    }
    verify().catch(console.error);
  }

}