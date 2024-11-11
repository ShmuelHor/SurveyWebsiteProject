import express, { Router } from 'express';
import { createUserHandler, loginHandler, getCandidatesHandler, getAllUsersHandler } from '../controllers/userController';
import { verifyToken } from "../middlewares/verifyToken";

const router: Router = express.Router();

router.route('/register').post(createUserHandler);
router.route('/login').post(loginHandler);

router.route('/candidates').get(verifyToken, getCandidatesHandler);
router.route('/users').get(verifyToken, getAllUsersHandler);

export default router;
