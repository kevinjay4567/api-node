import users from '../users.json' assert {type: 'json'};
class AuthController {

  login(req, res) {
    const { email, password } = req.body;
    users.forEach(user => {
      if(user.email == email && user.cedula == password) {
        return res.json({
          message: 'User authenticate'
        })
      }
    });
    return res.json({
      message: 'Fail to login'
    })
  }
}

const instance = new AuthController();
export default instance;