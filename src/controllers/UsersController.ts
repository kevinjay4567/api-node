import IUser from '../interfaces/IUser';

let users: Array<IUser> = []
class UsersController {

  index(_req:any, res:any) {
    return res.json(users)
  }

  store(req:any, res:any) {
    const {name, age, email, cedula, courses } = req.body;
    const user: IUser = {
      age,
      name,
      email,
      cedula,
      courses,
      id: 1
    }  
    users.push(user);
    return res.json({
      message: "User register"
    })
  }

  destroy(req:any, res:any) {
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

  find(req:any, res:any) {
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
