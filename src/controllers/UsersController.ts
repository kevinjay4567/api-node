import IUser from "../interfaces/IUser";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";

let users: Array<IUser> = [];
class UsersController {
  async index(_req: any, res: any) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async store(req: any, res: any) {
    const { name, email, password } = req.body;
    let user: Prisma.UserCreateInput;

    user = {
      name: name,
      email: email,
      password: password,
    };

    const createUser = await prisma.user.create({ data: user });
    return res.json({
      message: "User register",
      data: createUser,
    });
  }

  destroy(req: any, res: any) {
    const { id } = req.params;
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if (user.id == id) {
        users.splice(index, 1);
        return res.json({
          message: "User delete",
        });
      }
    }
    return res.status(404).json({
      message: "User not found",
    });
  }

  find(req: any, res: any) {
    const { id } = req.params;
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if (user.id == id) {
        return res.json(user);
      }
    }
    return res.status(404).json({
      message: "User not found",
    });
  }
}

const instance = new UsersController();
export default instance;
