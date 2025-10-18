import { Context, Next } from "hono";
import { decode, jwt, verify } from "hono/jwt";
import "dotenv/config";

const secret =
  process.env.JWT_SECRET ?? "a-string-secret-at-least-256-bits-long";
const INVALID_TOKEN_MESSAGE = "El token no es valido";
const INVALID_ROLE_MESSAGE = "No tienes el rol requerido";

class AuthMiddleware {
  basic = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!(await this.tokenVerify(token))) {
      c.status(401);
      return c.json({ error: INVALID_TOKEN_MESSAGE });
    }

    await next();
  };

  admin = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!(await this.tokenVerify(token))) {
      c.status(401);
      return c.json({ error: INVALID_TOKEN_MESSAGE });
    }

    if (!this.isAdmin(token)) {
      c.status(401);
      return c.json({ error: INVALID_ROLE_MESSAGE });
    }

    await next();
  };

  private tokenVerify = async (token: string | undefined) => {
    if (!token) {
      return false;
    }

    return await verify(token, secret);
  };

  private isAdmin = (token: string | undefined) => {
    if (!token) {
      return false;
    }

    return decode(token).payload["admin"];
  };
}

const instance = new AuthMiddleware();
export default instance;
