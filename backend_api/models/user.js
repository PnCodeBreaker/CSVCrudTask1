import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);

/* 
This is the User Model for Sign Up and Sign In , 
It is kept very Basic and someBasic Validation in Controller is done 
as The main instruction of task was to handle the CSV Data 
*/ 