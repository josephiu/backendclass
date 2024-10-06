//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const invController = require("../controllers/invController")


// Line 1 - a comment for the lines to follow.
// Line 2 - brings Express into the scope of the file.
// Line 3 - uses Express to create a new Router object. Remember in lesson 2 that using separate router files for specific elements of the application would keep the server.js file smaller and more manageable? That's what we're doing.
// Line 4 - brings the inventory controller into this router document's scope to be used.

//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

module.exports = router;

// Line 12 - a comment for the route.
// Line 13- the route, which is divided into three elements:

//     "get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
//     /type/:classificationId the route being watched for (note that the inv element of the route is missing, but it will be accounted for later).
//     invController.buildByClassification indicates the buildByClassification function within the invController will be used to fulfill the request sent by the route.

// Line 14 - left intentionally blank.
// Line 15 - exports the router object for use elsewhere. 