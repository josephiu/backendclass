//3 Needed Resources which we must declare to use them
const experess = require("express") 
const router = new experess.Router()
const invController = require("../controllers/invController")



//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


//Route to build vehicle view 
router.get("/detail/:vehicle_view", invController.buildByVehicle_Details);





module.exports = router;