import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import UserModal from "../models/user.js";
import isEmail from 'validator/lib/isEmail.js';

dotenv.config();
const secret = process.env.SECRET;
const maxAge = 7 * 24 * 60 * 60;

/* secret is in .env file */
/* this is the user signin , signup controller as in task 
a basic authorization middleware implementation was asked thus a jwt based authentication is implemented
*/

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: maxAge });
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    /* Cookie is used here as it was easier to operate through postman */
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if(!email || !password || !name )
    {
        return res.status(400).json({ message: "Enter all the fields"});
    }
    if(!isEmail(email))
    {
        return res.status(400).json({ message: "invalid Email is entered"});
    }
      
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: name });
    
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: maxAge } );
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    /* Cookie is used here as it was easier to operate through postman */
    res.status(201).json({ token });
    /* a token is also sent in case a bearer Token based Authentication is implemented */
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signout = (req,res) => {
  if(!req.cookies.jwt)
  {
    res.status(400).json({ message: "Cookie does not exist can't be logged out from backend if Bearer token is used"});
  }
  res.cookie('jwt','',{maxAge: 1});
  res.status(200).json({ message: "Logged Out SuccessFully"});
}

/* this signout is only possible if cookie 
based authentication is there, for eg if token is stored in frontend say LocalStorage 
then this signout won't be possible from backend as it will be the frontend's job */