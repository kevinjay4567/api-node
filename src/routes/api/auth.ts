import { decodeTokenPayload } from "../../services/token.service";
import userRepository from "../../repositories/user.repository";
import { Hono } from "hono";

// TODO: Auth router in progress
const authRouter = new Hono();

authRouter.post("/logout", (c) =>
  c.json({ message: "TODO: logout work in progress" })
);

authRouter.get("/profile", async (c) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  try {
    const payloadUserId = decodeTokenPayload(token)["sub"];
    const user = await userRepository.findById(Number(payloadUserId));

    if (!user) throw new Error("Error al encontrar al usuario");

    return c.json(user);
  } catch (error) {
    c.status(500);
    return c.json({ error });
  }
});

export default authRouter;
