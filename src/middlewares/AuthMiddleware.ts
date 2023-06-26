import jwt from "jsonwebtoken";
class AuthMiddleware {
  async tokenVerify(req: any, res: any, next: any) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret", (err: any) => {
      if (err) {
        return res.json({
          err,
        });
      }
      next();
    });
  }
}

const instance = new AuthMiddleware();
export default instance;
