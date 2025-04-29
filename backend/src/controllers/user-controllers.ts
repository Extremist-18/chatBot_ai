import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { create } from "domain";
import {createToken} from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js";
import { RequestHandler } from "express";

export const getAllUsers: RequestHandler  = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "ERROR", cause: (error as Error).message });
    }
}; 

export const userSignup  = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response|void> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already Registered");
        }
        
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        // create torkn and save cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none"
          });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);

        // res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires, httpOnly:true,signed:true});
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",    // for cross-site cookies
            expires: expires,   
        });
        res.status(201).json({ message: "OK", name: user.name, email:user.email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "ERROR", cause: (error as Error).message });
    }
};

export const verifyAuthStatus= async(req, res) => {
    // Data attached by verifyToken middleware
    const userData = res.locals.jwtData; 
    
    res.status(200).json({ 
      status: "OK",
      user: {
        id: userData.id,
        email: userData.email
      }
    });
  };

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {    
        // Fixed: Using _id instead of email for lookup
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered or invalid token" });
            return;
        }
        console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).json({ message: "Permissions didn't match" });
            return;
        }
        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error); // Pass to error handler middleware
    }
};


export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {    
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User not registered or invalid token" });
            return;
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).json({ message: "Permissions didn't match" });
            return;
        }

        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none"
          });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
  
// export const verifyUser  = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//     )=> {
//     try {    
//         const user = await User.findById({ email:res.locals.jwtData.id });
//         if (!user) {
//             return res.status(401).send("User Not Registered or invalid Token");
//         }
//         console.log(user._id.toString(),res.locals.jwtData.id);

//         if(user._id.toString()!== res.locals.jwtData.id){
//             return res.status(401).send("Permission didn't matched");
//         }

//         return res.status(200).json({ message: "OK", name: user.name, email:user.email });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "ERROR", cause: (error as Error).message });
//     }
// };  

export const userLogin  = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response|void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User Not Registered");
        }
        
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none"
          });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        // res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires, httpOnly:true,signed:true});
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",    // for cross-site cookies
            expires: expires,   
        });
        res.status(200).json({ message: "OK", name: user.name, email:user.email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "ERROR", cause: (error as Error).message });
    }
};