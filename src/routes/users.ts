import { Router } from "express";
import UsersController from "../controllers/UsersController";

const router = Router();

router.get("/", UsersController.index);
router.get("/:id", UsersController.find);
router.post("/", UsersController.store);
router.delete("/:id", UsersController.destroy);

export default router;