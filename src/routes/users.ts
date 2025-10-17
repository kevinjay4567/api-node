import UsersController from "../controllers/UsersController";
import { Hono } from "hono";

/*const router = Router();

router.get("/", UsersController.index);
router.get("/:id", UsersController.find);
router.post("/", UsersController.store);
router.delete("/:id", UsersController.destroy);*/

const usersRouter = new Hono();

usersRouter.get('/', UsersController.index);
usersRouter.get('/:id', UsersController.find);
usersRouter.post('/', UsersController.store);
usersRouter.delete('/:id', UsersController.delete);

export default usersRouter;