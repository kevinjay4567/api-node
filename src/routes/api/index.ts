import AuthController from "../../controllers/auth.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";
import usersRouter from "./admin/users";
import authRouter from "./auth";
import { Hono } from "hono";

const apiRouter = new Hono();

apiRouter.get("/", (c) => {
  return c.json({
    message: "Api routes",
  });
});

apiRouter.post("/login", AuthController.login);

// Middlewares
apiRouter.use("/auth/*", AuthMiddleware.basic);
apiRouter.use("/admin/*", AuthMiddleware.admin);

// Api routes
apiRouter.route("/auth", authRouter);
apiRouter.route("/admin/users", usersRouter);

export default apiRouter;