import express, { Router } from 'express';
import { createUserHandler, loginHandler,getCandidatesHandler } from '../controllers/controller';


const router:Router = express.Router();

router.route('/register').post(createUserHandler);
router.route('/login').post(loginHandler);
router.route('/candidates').get(getCandidatesHandler);

export default router;