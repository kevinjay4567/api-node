import IUser from "../interfaces/IUser";
import { prisma } from "../db";
import { Request, Response } from "express";

let users: Array<IUser> = [];
class UsersController {
  async index(_req: any, res: any) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const user = await prisma.user.create({
      data: {
        name: "Kevin",
        email: "kevin@mail.com",
        password: "secret",
        phone: 123123123,
        nacionalidad: "COLOMBIA",
      },
    });

    if (!user) {
      return res.json({
        message: "Error al crear el usuario",
      });
    }

    return res.json({
      message: `Usuario ${user.name} creado con exito`,
    });
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Error al eliminar el usuario",
      });
    }

    return res.json({
      message: `Usuario ${user.name} eliminado con exito`,
    });
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return !user
      ? res.status(404).json({ message: "Usuario no encontrado" })
      : res.json(user);
  }
}

const instance = new UsersController();
export default instance;
