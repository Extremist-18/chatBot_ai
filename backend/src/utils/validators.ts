import { Request, Response, NextFunction } from "express";
import { body,ValidationChain, validationResult } from "express-validator";

const validate = (validations:ValidationChain[]) => {
    return async (req:Request,res:Response,next:NextFunction) => {
        for (let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        res.status(422).json({errors: errors.array()});
    } 
};
export const loginValidator = [
    // body("name").notEmpty().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("email is Required"),
    body("password").trim().isLength({min:6}).withMessage("should contain atleast 6 characters")
];
const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    // body("email").trim().isEmail().withMessage("email is Required"),
    // body("password").trim().isLength({min:6}).withMessage("should contain atleast 6 characters")
    ...loginValidator,
];

const chatCompleteValidator = [
    body("message").notEmpty().withMessage("Name is Required"),
    // body("email").trim().isEmail().withMessage("email is Required"),
    // body("password").trim().isLength({min:6}).withMessage("should contain atleast 6 characters")
    // ...loginValidator,
];

export {validate, signupValidator,chatCompleteValidator};