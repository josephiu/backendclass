// routes/cookieRoute.js
const express = require("express");
const router = express.Router();
const cookieController = require("../controllers/cookieController");

// Route to accept the cookie policy
router.post("/accept-cookie", cookieController.acceptCookie);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const cookieController = require("../controllers/cookieController");
// const utilities = require("../utilities");

// // Middleware to inject `showCookieBanner` flag
// router.use(cookieController.displayBanner);

// // Route to accept the cookie policy
// router.post("/accept-cookie", utilities.handleErrors(cookieController.acceptCookie));

// module.exports = router;



// // routes/cookieRoute.js
// const express = require("express");
// const router = express.Router();
// const cookieController = require("../controllers/cookieController");
// const utilities = require("../utilities")

// // Route to render the page with the cookie banner
// router.get("/", utilities.handleErrors(cookieController.displayBanner))


// // Route to accept the cookie policy
// router.post("/accept-cookie", utilities.handleErrors(cookieController.acceptCookie));




// module.exports = router;
