import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user.js';
import csvRoutes from './routes/csv.js';
import csvDataRoutes from './routes/csvdata.js';

const app = express();
dotenv.config();

const __dirname = path.resolve();

/* middleware */

app.use(express.json({ limit: "20mb", extended: true}));
app.use(express.urlencoded({ limit: "20mb", extended: true}));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: path.join(__dirname, 'tmp'), createParentPath: true }));
app.use(cors());

/* routes */
app.use('/user', userRoutes);  /* this route is for signin/signup purposes */       

/* this route is home route where csv file is uploaded and csv files created by authenticated is retrieved */
app.use('/home', csvRoutes);       
/* this route is for CRUD operation on the contents of the parsed csv data in mongoDB */
app.use('/home/csvdata', csvDataRoutes);


app.get('/',(req,res) => {
        res.send('Welcome to CSV TASK1 API, Please Check the Github Readme for the Routes and how to use the api, Github Link:- https://github.com/PnCodeBreaker/CSVCRUDTASK1');
})
/* only this route is unauthenticated , all the other routes have auth middleware, 
sign in/sign up to generate one */


/* PORT, CONNECTION_URL are defined in .env (Environmental Variables ) */
const PORT = process.env.PORT || 5000;

/* mongodb connection , mongoDb Atlas is used to deploy in heroku but it can be locally used to */

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`)))
        .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify', false);

