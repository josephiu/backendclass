//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const addClassValidate = require('../utilities/addclassification-validation')




//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


//Route to build vehicle view 
router.get("/detail/:vehicle_view", invController.buildByVehicle_Details);

//Route to build managemnet view 
router.get("/management/", utilities.handleErrors(invController.buildmanagement));


// Route to build the Add Classification view
router.get("/add-classification", utilities.handleErrors(invController.buildaddclassification));
                                                                     

// Route to process the Add Classification view
router.post(
    "/add-classification", 
    addClassValidate.classificationRules(),
    addClassValidate.checkclassData ,
    utilities.handleErrors(invController.addclassificationProcessing)
);


module.exports = router;