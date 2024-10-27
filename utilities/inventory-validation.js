const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  
  

  
  const validate = {}

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.inventoryRules = () => {
    return [
      // selection is required 
      body("classification_id")        
        .notEmpty()
        .withMessage("required."),
          
      // make is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide the make."), // on error this message is sent.

          // Description is required and must be string
      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a short description."), // on error this message is sent.

        
      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min:2 })
        .withMessage("Please color is required."), // on error this message is sent.

 
      body("inv_price")
        .trim()
        .escape()
        .matches(/^\d*\.?\d+$/)
        .notEmpty()
        .isLength({ min:2 })
        .withMessage("Integer or decimal is required."), // on error this message is sent.

      body("inv_year")
        .trim()
        .escape()
        .matches(/^\d{4}$/)
        .notEmpty()
        .isLength({ min:2 })
        .withMessage("Enter 4 Digits."), // on error this message is sent.

      body("inv_miles")
        .trim()
        .escape()
        .matches(/^\d{4}$/)
        .notEmpty()
        .isLength({ min:2 })
        .withMessage("Integer or decimal is required"), // on error this message is sent. 

      
    ]},
 
  
   
     

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkinvData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Inventory",
        nav,
        classification_id, 
        inv_make, 
        inv_model, 
        inv_description,         
        inv_price, 
        inv_year, 
        inv_color,
      })
      return
    }
    next()
  }


  
  module.exports = validate