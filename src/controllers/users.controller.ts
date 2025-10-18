import { Context } from "hono";
import { db } from "../dbclient";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

class UsersController {
  index = async (c: Context) => {
    const users = await db.select().from(usersTable);
    return c.json(users);
  };

  store = async (c: Context) => {
    const user = await c.req.json();

    try {
      await db.insert(usersTable).values(user);
    } catch (error) {
      console.error(error);
    }

    return c.json({
      message: "Usuario creado con exito",
    });
  };

  delete = async (c: Context) => {
    const id = c.req.param("id");

    try {
      await db.delete(usersTable).where(eq(usersTable.id, Number(id)));
    } catch (error) {
      console.error(error);
    }

    return c.json({
      message: `Usuario ${id} eliminado con exito`,
    });
  };

  find = async (c: Context) => {
    const id = c.req.param("id");
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));

    if (!user[0]) {
      c.status(404);
      return c.json({ message: "Usuario no encontrado" });
    }

    return c.json(user[0]);
  };
}

export default new UsersController();
