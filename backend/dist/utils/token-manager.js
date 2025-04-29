import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
// export const verifyToken = async(req:Request, res:Response, next:NextFunction) =>{
//     const token = req.signedCookies['${COOKIE_NAME}'];
//     if (!token || token.trim() === "") {
//         return res.status(401).json({ message: "Token not found" });
//     }
//     return new Promise<void>((resolve,reject) => {
//         return jwt.verify(token,process.env.JWT_SECRET, (err,success) =>{
//             if(err){
//                 reject(err.message);
//                 return res.status(401).json({message:"Token Expired"});
//             }else{
//                 console.log("Token verification successful");
//                 resolve();
//                 res.locals.jwtData = success;
//                 return next();
//             }
//         });
//     })
// }
const COOKIE_NAME = "auth_token"; // Make sure this is defined
export const verifyToken = async (req, res, next) => {
    // Use signedCookies only if you actually signed the cookie when setting it
    const token = req.cookies[COOKIE_NAME]; // or req.signedCookies[COOKIE_NAME] if using signed cookies
    if (!token || token.trim() === "") {
        res.status(401).json({ message: "Token not found" });
        return;
    }
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    return reject(err);
                resolve(decoded);
            });
        });
        res.locals.jwtData = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token expired or invalid" });
    }
};
