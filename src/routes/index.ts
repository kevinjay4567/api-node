import { Router } from "express";
import usersRouter from "./users";
import CoursesController from "../controllers/CoursesController";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello world" });
});

router.use("/users", usersRouter);

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
router.post("/logout", AuthMiddleware.tokenVerify, AuthController.logout);

export default router;
