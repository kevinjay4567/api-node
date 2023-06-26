import { prisma } from "../db";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";

let userAuth: IUser | any = {};
class AuthController {
  async login(req: any, res: any) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && user.password === password) {
      const token = await prisma.token.create({
        data: {
          token: jwt.sign(user, "secret", { expiresIn: 60 * 5 }),
          userId: user.id,
        },
      });
      userAuth = user;
      return res.json({
        message: "User authenticate",
        data: token,
      });
    }
    return res.json({
      error: "Fail to login",
    });
  }

  async register(req: any, res: any) {
    const { email, password, name } = req.body;
    await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: password,
          courses: {
            create: {
              name: "Estructura de datos",
              credits: 3,
            },
          },
        },
      })
      .then(() => {
        return res.json({
          message: "User regist",
        });
      })
      .catch((error) => {
        return res.json({
          error,
        });
      });
  }

  async logout(req: any, res: any) {
    await prisma.token
      .deleteMany({
        where: {
          userId: userAuth.id,
        },
      })
      .then(() => {
        console.log(userAuth);
        userAuth = {};
        return res.json({
          messsage: "User logout",
        });
      })
      .catch((error) => {
        return res.json({
          error,
        });
      });
  }
}

const instance = new AuthController();
export default instance;
