import { Hono } from "hono";
import usersRouter from "./admin/users";
import authRouter from "./auth";
import CoursesController from "../../controllers/CoursesController";
import AuthController from "../../controllers/AuthController";
import AuthMiddleware from "../../middlewares/auth.middleware";

const apiRouter = new Hono();

apiRouter.get("/", (c) => {
  return c.json({
    message: "Api routes",
  });
});

apiRouter.post("/login", (c) =>
  c.json({ message: "TODO: login work in progress" })
);

// Middlewares
apiRouter.use("/auth/*", AuthMiddleware.basic);
apiRouter.use("/admin/*", AuthMiddleware.admin);

// Api routes
apiRouter.route("/auth", authRouter);
apiRouter.route("/admin/users", usersRouter);

export default apiRouter;

/*
router.get("/courses", AuthMiddleware.tokenVerify, CoursesController.index);
router.get(
  "/addCourses",
  AuthMiddleware.tokenVerify,
  CoursesController.showNoAddedCourses
);
router.post("/courses", CoursesController.store);
router.delete("/courses/:id", CoursesController.destroy);

router.post("/login", AuthController.login);
router.get("/profile", AuthMiddleware.tokenVerify, AuthController.profile);
router.post("/register", AuthController.register);
router.post("/logout", AuthMiddleware.tokenVerify, AuthController.logout);*/
