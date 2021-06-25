# CSVCrudTask1
<b> A repo of CSV CRUD API for Internship Interview Task1 using Node.js, Express.js and MongoDB </b> <br><br>
<b> This API takes a CSV file from form multipart and after that it is parsed and contents are mapped to mongoose collection and upon that mongoose collection CRUD operation is performed. Also Every Route (Except ('/') ) is protected through authentication token middleware thus User needs to first SignUp/SignIn to use </b>
<br>
<br>
<h3> The API is also Deployed to Heroku :- https://csvcrudtask.herokuapp.com/ </h3>
<b> the MongoDB Atlas is used for storing the data </b>
<br>
<h4> To Run the API in Local machine </h4>

```bash
   $ git clone the above repo OR git clone https://github.com/PnCodeBreaker/CSVCrudTask1.git
   $ cd to the directory and cd to backend_api
   $ npm install ( node.js must be installed )
   $ ENV FILE needs to be Set Up
   $ Two ENV variables are used :-
   $ SECRET (JWT SECRET) and CONNECTION_URL (For mongoDB connection either use localmongoDB or MongoDB Atlas)
   $ use nodemon to start the API OR use node index.js
```
<br>
<h4> How to use the API with PostMan </h4>
<ul> <li> 
