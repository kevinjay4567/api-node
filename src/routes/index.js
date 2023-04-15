import { Router } from "express";
import UsersController from '../controllers/UsersController.js'

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
})

router.get('/users', UsersController.index) 
router.post('/users', UsersController.store) 

export default router;