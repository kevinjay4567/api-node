import IUser from '../interfaces/IUser'

const users: Array<IUser> = []
class AuthController {

  login(req:any, res:any) {
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
