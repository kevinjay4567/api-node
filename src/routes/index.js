import { Router } from "express";
import UsersController from '../controllers/UsersController.js';
import CoursesController from '../controllers/CoursesController.js';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
})

router.get('/users', UsersController.index); 
router.post('/users', UsersController.store); 
router.delete('/users/:id', UsersController.destroy);

router.get('/courses', CoursesController.index);
router.post('/courses', CoursesController.store);
router.delete('/courses/:id', CoursesController.destroy);

router.get('/login', AuthController.login);

export default router;