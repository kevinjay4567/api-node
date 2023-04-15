import { Router } from "express";
import UsersController from '../controllers/UsersController.js';
import CoursesController from '../controllers/CoursesController.js';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
})

router.get('/users', UsersController.index); 
router.delete('/test/:id', UsersController.destroy);
router.post('/users', UsersController.store); 

router.get('/courses', CoursesController.index);

router.get('/login', AuthController.login);

export default router;