import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { db } from "../../dbclient";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const secret = process.env.JWT_SECRET ?? "a-string-secret-at-least-256-bits-long";

// TODO: Auth router in progress
const authRouter = new Hono();

authRouter.post("/logout", (c) =>
  c.json({ message: "TODO: logout work in progress" })
);

authRouter.get("/profile", async (c) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) {
    c.status(500);
    return c.json({ error: "Error al leer el token" });
  }

  const payloadUserId = decode(token).payload['id'];
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, Number(payloadUserId)));

  if (!user[0]) {
    c.status(500);
    return c.json({ error: "Error al buscar el usuario activo" });
  }

  return c.json(user[0]);
});

export default authRouter;
