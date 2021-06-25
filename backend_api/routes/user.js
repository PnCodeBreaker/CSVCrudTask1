import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { signin, signup, signout } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", auth, signout);
export default router;

/* These are the user authentication routes 
to signin and signup the user as it was mentioned to create a basic authentication token middleware, 
thus Jwt token is created */