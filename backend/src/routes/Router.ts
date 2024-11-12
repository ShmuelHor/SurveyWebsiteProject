import express, { Router } from 'express';
import { createUserHandler, loginHandler, getAllUsersHandler } from '../controllers/userController';
import {getCandidatesHandler} from '../controllers/CandidateController'
import { verifyToken } from "../middlewares/verifyToken";

const router: Router = express.Router();

router.route('/register').post(createUserHandler);
router.route('/login').post(loginHandler);
router.route('/candidates').get(verifyToken, getCandidatesHandler);
router.route('/users').get(verifyToken, getAllUsersHandler);

export default router;
