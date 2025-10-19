import userRepository from "../repositories/user.repository";
import { Context } from "hono";

class UsersController {
  index = async (c: Context) => c.json(await userRepository.all());

  store = async (c: Context) => {
    const user = await c.req.json();

    try {
      await userRepository.save(user);
    } catch (error) {
      c.status(501);
      return c.json({ error });
    }

    return c.json({
      message: "Usuario creado con exito",
    });
  };

  delete = async (c: Context) => {
    const id = c.req.param("id");

    try {
      await userRepository.delete(Number(id));
    } catch (error) {
      c.status(501);
      return c.json({ error });
    }

    return c.json({
      message: `Usuario ${id} eliminado con exito`,
    });
  };

  find = async (c: Context) => {
    const id = c.req.param("id");
    const user = await userRepository.findById(Number(id));

    if (!user) {
      c.status(404);
      return c.json({ message: "Usuario no encontrado" });
    }

    return c.json(user);
  };
}

export default new UsersController();
