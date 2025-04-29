import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [ChatSchema],
    default: [],    
  },
});

const User = mongoose.model("User", UserSchema);
export default User;

// import mongoose from "mongoose";
// import { randomUUID } from "crypto";
// const chatSchema = new mongoose.Schema({
//     id:{
//         type: String,
//         default:randomUUID(),
//     }, 
//     role: {
//         type: String,
//         required: true,
//     },
//     content:{
//         type: String,
//         required: true,
//     },
// });
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required : true,
//     },
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
//     chats:[chatSchema],
// });

// export default mongoose.model("User",userSchema);