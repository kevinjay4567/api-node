import users from '../users.json' assert { type: 'json'}

class UsersController {

  index(req, res) {
    res.json(users)
  }

  store(req, res) {
    const id = users.length + 1;
    const newUser = { ...req.body, id };
    users.push(newUser);
    res.json({
      message: "User register"
    })
  }

}

const instance = new UsersController;
export default instance