//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')



//Route to build account controller
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// process the registration data
router.post(
    "/register", 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)


  // Process the login attempt
router.post(
  "/login",
  // regValidate.loginRules(),
  // regValidate.checkLogData,
  utilities.handleErrors(accountController.accountLogin)
);

// router.get("/management",
//   utilities.handleErrors(utilities.checkLogin),
//   utilities.handleErrors(accountController.buildAccountManagement));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))



module.exports = router;