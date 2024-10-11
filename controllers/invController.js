const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



/* ***************************
 *  single selections for the vehicl 
 * ************************** */
invCont.buildByVehicle_Details = async function (req, res, next) {
  const Vehicle_View = req.params.vehicle_view
  const data = await invModel.getInventoryByInventory_id(Vehicle_View)
  const div = await utilities.buildInventorydiv(data)
  let nav = await utilities.getNav()
  const Vehicle_make = data[0].inv_make + '' + data[0].inv_model
  res.render("./vehicle/vehicles", {
    title: Vehicle_make,
    nav,
    div,
  })
}





module.exports = invCont


