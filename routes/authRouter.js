import express from 'express';
import { getLogin, postLogin, getLogout, getsignup, postSignup} from '../controllers/authController.js';

const router = express.Router();


router.get('/login',getLogin);

router.post('/loginform', postLogin);

router.get('/logout',getLogout);

router.get('/sign-up',getsignup);

router.post('/signupform', postSignup);








export default router;