import { decodeTokenPayload, validateToken } from "../services/token.service";
import { apiMessages } from "../constants/api-messages";
import { Context, Next } from "hono";

class AuthMiddleware {
  basic = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!(await validateToken(token))) {
      c.status(401);
      return c.json({ error: apiMessages.INVALID_TOKEN_MESSAGE });
    }

    await next();
  };

  admin = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!(await validateToken(token))) {
      c.status(401);
      return c.json({ error: apiMessages.INVALID_TOKEN_MESSAGE });
    }

    if (!this.isAdmin(token)) {
      c.status(401);
      return c.json({ error: apiMessages.INVALID_ROLE_MESSAGE });
    }

    await next();
  };

  private isAdmin = (token: string | undefined) => {
    if (!token) {
      return false;
    }

    return decodeTokenPayload(token)['admin'];
  };
}

const instance = new AuthMiddleware();
export default instance;
