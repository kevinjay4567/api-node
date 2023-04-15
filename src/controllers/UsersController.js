import users from '../users.json' assert { type: 'json'}
import User from '../models/User.js';

class UsersController {

  index(req, res) {
    return res.json(users)
  }

  store(req, res) {
    const {name, age, email, cedula, courses } = req.body;
    const user = new User();
    user.age = age;
    user.name = name;
    user.email = email;
    user.cedula = cedula;
    user.courses = courses;
    user.id = users.length + 1;
    users.push(user);
    return res.json({
      message: "User register"
    })
  }

  destroy(req, res) {
    const { id } = req.params;
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if(user.id == id) {
        users.splice(index, 1);
        return res.json({
          message: 'User delete'
        });
      }
    }
    return res.status(404).json({
      message: 'User not found'
    })
  }

  find(req, res) {
    const { id } = req.params;
    for (let index = 0; index < users.length; index ++) {
      const user = users[index];
      if (user.id == id) {
        return res.json(user)
      }
    }
    return res.status(404).json({
      message: 'User not found'
    })
  }

}

const instance = new UsersController();
export default instance