import {Router,RequestHandler} from 'express'
import { getAllUsers,userSignup, userLogin, verifyAuthStatus, verifyUser, userLogout } from '../controllers/user-controllers.js';
import {loginValidator, signupValidator,validate} from "../utils/validators.js"
import { verifyToken } from '../utils/token-manager.js';
const userRoutes = Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",validate(signupValidator),userSignup as RequestHandler);
userRoutes.post("/login",validate(loginValidator),userLogin as RequestHandler);

userRoutes.get("/auth-status",verifyToken, verifyUser);
userRoutes.get("/logout",verifyToken, userLogout);

export default userRoutes;
