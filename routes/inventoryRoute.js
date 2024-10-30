//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const addClassValidate = require('../utilities/addclassification-validation')
const inventoryValidate = require('../utilities/inventory-validation')





//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


//Route to build vehicle view 
router.get("/detail/:vehicle_view", invController.buildByVehicle_Details);

//Route to build managemnet view 
router.get("/", utilities.handleErrors(invController.buildmanagement));


// Route to build the Add Classification view
router.get("/inventory/add-classification/", utilities.handleErrors(invController.buildaddclassification));
                                                                     

// Route to process the Add Classification view
router.post(
    "/inventory/add-classification/", 
    addClassValidate.classificationRules(),
    addClassValidate.checkclassData ,
    utilities.handleErrors(invController.addclassificationProcessing)
);

// Route to build the Add Classification view
router.get("/inventory/add-inventory/", utilities.handleErrors(invController.buildaddinventory));

// Route to build the add vehicle view
router.get(
    "/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));



// Route to process the Add inventory view
router.post(
    "/inventory/add-inventory/", 
    // inventoryValidate.inventoryRules(),
    // inventoryValidate.checkinvData,
    utilities.handleErrors(invController.addinventoryProcessing)
);
        

module.exports = router;