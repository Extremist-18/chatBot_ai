import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
// export const generateChatCompletion = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const { message } = req.body;
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) return res.status(401).json({ message: "User Not Registered or invalid Token" });
//         // Collect chats
//         const chats = user.chats.map(({ role, content }) => ({ 
//             role, 
//             content,
//         })) as ChatCompletionMessageParam[];
//         chats.push({ content: message, role: "user" });
//         user.chats.push({ content: message, role: "user" });
//         // Send all chats + new chat to OpenAI
//         const openai = configureOpenAI();
//         const chatResponse = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: chats
//         });
//         // Get latest response and save to user
//         const assistantMessage = chatResponse.choices[0].message;
//         user.chats.push(assistantMessage);
//         await user.save();
//         return res.status(200).json({ chats: user.chats });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// };
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).json({ message: "User Not Registered or invalid Token" });
            return;
        }
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const openai = configureOpenAI();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats
        });
        const assistantMessage = chatResponse.choices[0].message;
        user.chats.push(assistantMessage);
        await user.save();
        res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
// export const generateChatCompletion: RequestHandler = async (req, res, next) => {
//     try {
//         const { message } = req.body;
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             res.status(401).json({ message: "User Not Registered or invalid Token" });
//             return; // Explicit return after sending response
//         }
//         // Collect chats
//         const chats = user.chats.map(({ role, content }) => ({ 
//             role, 
//             content,
//         })) as ChatCompletionMessageParam[];
//         chats.push({ content: message, role: "user" });
//         user.chats.push({ content: message, role: "user" });
//         // Send all chats + new chat to OpenAI
//         const openai = configureOpenAI();
//         const chatResponse = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: chats
//         });
//         // Get latest response and save to user
//         const assistantMessage = chatResponse.choices[0].message;
//         user.chats.push(assistantMessage);
//         await user.save();
//         res.status(200).json({ chats: user.chats }); // No return here
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" }); // No return here
//     }
// };
// export const sendChatsToUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {    
//         // Fixed: Using _id instead of email for lookup
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             res.status(401).json({ message: "User not registered or invalid token" });
//             return;
//         }
//         console.log(user._id.toString(), res.locals.jwtData.id);
//         if (user._id.toString() !== res.locals.jwtData.id) {
//             res.status(401).json({ message: "Permissions didn't match" });
//             return;
//         }
//         return res.status(200).json({message:"OK", chats:user.chats})
//         // res.locals.user = user;
//         // next();
//     } catch (error) {
//         console.log(error);
//         next(error); // Pass to error handler middleware
//     }
// };
export const sendChatsToUser = async (req, res, next) => {
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
        res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteChats = async (req, res, next) => {
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
        // @ts-ignore
        user.chats = [];
        await user.save();
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// export const deleteChats = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {    
//         // Fixed: Using _id instead of email for lookup
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             res.status(401).json({ message: "User not registered or invalid token" });
//             return;
//         }
//         console.log(user._id.toString(), res.locals.jwtData.id);
//         if (user._id.toString() !== res.locals.jwtData.id) {
//             res.status(401).json({ message: "Permissions didn't match" });
//             return;
//         }
//         // @ts-ignore
//         user.chats = [];
//         await user.save();
//         return res.status(200).json({message:"OK"})
//         // res.locals.user = user;
//         // next();
//     } catch (error) {
//         console.log(error);
//         next(error); 
//     }
// };
