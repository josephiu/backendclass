/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/

const session = require("express-session")
const pool = require('./database/')
const express = require("express")
const baseController = require("./controllers/baseController")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")
const errorRoute = require('./routes/errorRoute')
const accountRoute = require('./routes/accountRoute')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
// const express = require("express");
// const cookieParser = require("cookie-parser");
const cookieRoute = require("./routes/cookieRoute");



/* ***********************
 * Middleware
 * ************************/

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

app.use(utilities.checkJWTToken)



// app.use(static)
app.use(express.static("public"))
// app.use("/", cookieRoute)

app.use("/cookies", cookieRoute)

app.use((req, res, next) => {
  res.locals.showCookieBanner = !req.cookies.acceptedCookies; // true if cookie is not accepted
  next();
});


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root


/* ***********************
 * Routes
 *************************/


//Index route
// app.get("/", baseController.buildHome)  ----before  we added the robust error handling
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use("/inv", inventoryRoute)

app.use("/account", accountRoute)

app.use(errorRoute);

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/


// app.use(async (err, req, res, next) => {
//   let nav = await utilities.getNav()

//   console.error(`Error at: "${req.originalUrl}": ${err.message}`)
//   if (err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a differnt route?'}
//   res.render("errors/error", {
//     title: err.status ||'Server Error',
  
//     message,
//     nav
//   })
// })

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  // Set a custom message for the error
  const message = err.status == 404 ? err.message : 'Oh no! There was a crash. Maybe try a different route?';
  // Set custom title for status 500
  const title = err.status === 500 ? 'Server Error' : err.status || 'Error';
  res.render("errors/error", {
    title,  // Use the custom title
    message,
    nav
  });
});











/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})


