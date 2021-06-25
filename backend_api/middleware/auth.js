import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET;

/* SECRET is in .env file any type of JWT Secret can be given */

const auth = async (req, res, next) => {
  try {
    let tokenData = req.cookies.jwt;
    if(!tokenData)
    {
      tokenData = req.headers.authorization.split(" ")[1];
    } 

    /* this was done like this because POSTMAN is used so either token can be recieved 
    from cookies or the Bearer Token Header */

    const token = tokenData;
    let decodedData;

    if (!token) { 
        res.status(404).json({ message: "Authorization failed"});
    } else {
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
        req.userEmail = decodedData?.email;
    }
        
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Authorization failed"});
  }
};

export default auth;

/* 
This is the Auth Middleware to check if the user is 
Authorized to the protected routes or not 
Note: - The Authorization Token can either be from Cookies or Bearer Token Header 
        ( It is implemented as this so that it 
          will be easier to work in PostMan 
          as cookies will be autogenreated and recieved in each requests )
*/