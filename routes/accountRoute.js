//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")



//Route to build account controller
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
router.post("/register", utilities.handleErrors(accountController.registerAccount))

module.exports = router;