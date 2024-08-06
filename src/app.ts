const express = require('express');
const app = express();
const session = require('express-session');
const config = require('./config'); // Adjust the path as needed
const importRouter = require("./routes/routes");


const { applicationPort, AppSecretKey } = config;
const {router} = importRouter; ;


// Set up express-session middleware
app.use(session({
  //Session secret key
    secret: AppSecretKey,  // Change this to a secure key
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        // Enable only for HTTPS
        httpOnly: false,
        // Prevent client-side access to cookies
        sameSite: 'strict'
        // Mitigate CSRF attacks
    }
  }));

app.use(express.json());
//body parser
app.use(express.urlencoded({extended:true}));
//application routes
app.use("/api", router);
//application port, if null use default 8080
const port = applicationPort || 8080;
app.listen(port, () => {
 console.log(`Server is running on ${port}!`);
});