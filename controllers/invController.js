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
    errors: null,

   
    
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
    errors: null,

    
    
  })
}

// Deliver mangement view
//* *************************************** */
invCont.buildmanagement = async function(req, res, next) {
  let nav = await utilities.getNav()  
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Management",
    classificationList,
    nav,    
    errors: null,
  })
}




// //* *************************************** */
// // Deliver addclassification view
// //* *************************************** */
invCont.buildaddclassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classificaton",
    nav,
    errors: null,
  })
}


// //* *************************************** */
// // Deliver addinventory view
// //* *************************************** */
invCont.buildaddinventory= async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    classificationList ,
    nav,
    errors: null,
  })
}






/* ****************************************
*  Process Registration
* *************************************** */
invCont.addclassificationProcessing = async function (req, res) {
  let nav = await utilities.getNav()  


  const { classification_name} = req.body 

  const regResult = await invModel.AddClassification(
    classification_name
    
  )
  console.log(regResult)

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${classification_name} is added sucessfully.`
    )
    let nav = await utilities.getNav()//I redeclared the navication bar to help it refresh on its own
   
    res.render("inventory/add-classification", { 
      title: "Add Classificaton",
      nav,
      errors: null,
    })
  
  } else {
    req.flash("notice", "Sorry, the Classication Faild to add.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classificaton ",
      nav,
      errors:null,
    })
  }
}





/* ****************************************
*  Process add-inventory
* *************************************** */
invCont.addinventoryProcessing = async function (req, res) {
  let nav = await utilities.getNav()   


  const {  inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id} = req.body

  const regResult = await invModel.AddNewinventory( inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    
  )
  console.log(regResult)
  console.log(classification_id)
  console.log(inv_image)

  


  if (regResult) {
    let classificationList = utilities.buildClassificationList()
    req.flash(
      "notice",
      `Congratulations, Your ${inv_make} Vehicle is added sucessfully.`
    )
    
    res.render("./inventory/management", {
      title: "Management",
      classificationList,
      nav,    
      errors: null,
      inv_make,
      inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_color,

    })

      
  
  
  } else {
    req.flash("notice", "Sorry, the Classication Faild to add.")
    let classificationList = utilities.buildClassificationList()
    res.status(501).render("./inventory/add-inventory/", {
      title: "Add Classificaton ",
      classificationList,
      nav,
      errors:null,
    })
  }
}

  // Return Inventory by Classification As JSON

invCont.getInventoryJSON = async (req, res, next) => {
 const classification_id = parseInt(req.params.classification_id)
 const invData = await invModel.getInventoryByClassificationId(classification_id)
 if (invData[0].inv_id) {
   return res.json(invData)
 } else {
   next(new Error("No data returned"))
 }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  let nav = await utilities.getNav();
  const itemDataArray = await invModel.getInventoryByInvId(inv_id);
  const itemData = itemDataArray[0]; // Access the first element of the array instead of adding on res.render
 
  if (!itemData) {
    req.flash("error", "Item not found");
    return res.redirect("/inv");
  }
 
  const classificationList = await utilities.buildClassificationList(
    itemData.classification_id
  );
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
 
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
  });
};







module.exports = invCont


