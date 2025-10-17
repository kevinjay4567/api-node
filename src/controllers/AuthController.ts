import { prisma } from "../dbclient";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";

export let userAuth: IUser | any = {};
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
    const { email, password, name, phone, nacionalidad } = req.body;
    if (!email || !password || !name || !phone || !nacionalidad) {
      return res.status(400).json({
        error: "Empty field",
      });
    }
    await prisma.user
      .create({
        data: {
          name: name,
          phone: phone,
          nacionalidad: nacionalidad,
          email: email,
          password: password,
          courses: {
            create: [
              {
                name: "Estructura de datos",
                credits: 3,
                aprobe: false,
                type: "Disciplinar obligatoria",
              },
              {
                name: "Calculo diferencial",
                credits: 4,
                aprobe: false,
                type: "Fundamenta obligatoria",
              },
            ],
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

  async logout(_: any, res: any) {
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

  async profile(_: any, res: any) {
    const user = await prisma.user.findUnique({
      where: {
        id: userAuth.id,
      },
      select: {
        name: true,
        nacionalidad: true,
        phone: true,
        email: true,
      },
    });

    if (user) {
      return res.json({
        message: "OK",
        data: user,
      });
    }

    return res.status(404).json({
      error: "User not found",
    });
  }
}

const instance = new AuthController();
export default instance;
