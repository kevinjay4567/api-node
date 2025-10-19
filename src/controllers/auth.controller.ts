import userRepository from "../repositories/user.repository";
import { signUser } from "../services/token.service";
import { Context } from "hono";

class AuthController {
  async login(c: Context) {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({
        error: "Fallo al iniciar sesión: campos vacíos",
      });
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return c.json({
        error: "Fallo al iniciar sesión: usuario no encontrado",
      });
    }

    const payload = { sub: user.id, email: user.email, iat: 1516239022 };
    const token = await signUser(payload);
    
    return c.json({
      message: "User authenticate",
      token,
    });
  }
}

const instance = new AuthController();
export default instance;
