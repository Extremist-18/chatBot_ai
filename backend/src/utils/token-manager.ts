
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const createToken =(id:string, email:string, expiresIn) =>{
    const payload = {id, email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn :"7d",
    });
    return token;
}

const COOKIE_NAME = "auth_token";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    res.status(401).json({ message: "Token not found" });
    return;
  }
  console.log("Cookies:", req.cookies);
  console.log("Signed Cookies:", req.signedCookies);

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });

    res.locals.jwtData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};