"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.route('/register').post(userController_1.createUserHandler);
router.route('/login').post(userController_1.loginHandler);
router.route('/candidates').get(verifyToken_1.verifyToken, userController_1.getCandidatesHandler);
router.route('/users').get(verifyToken_1.verifyToken, userController_1.getAllUsersHandler);
exports.default = router;
