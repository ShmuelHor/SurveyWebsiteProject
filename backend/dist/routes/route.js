"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.route('/register').post(controller_1.createUserHandler);
router.route('/login').post(controller_1.loginHandler);
router.route('/candidates').get(controller_1.getCandidatesHandler);
exports.default = router;
