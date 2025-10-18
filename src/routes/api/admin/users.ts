import UsersController from "../../../controllers/users.controller";
import { Hono } from "hono";

const usersRouter = new Hono();

usersRouter.get('/', UsersController.index);
usersRouter.get('/:id', UsersController.find);
usersRouter.post('/', UsersController.store);
usersRouter.delete('/:id', UsersController.delete);

export default usersRouter;