const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const accountModel = require("../models/inventory-model")
  
  const validate = {}

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.classificationRules = () => {
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .notEmpty()
        .matches(/^[a-zA-Z0-9]*$/) //to ensure no space or special character
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please fill Out this field.") // on error this message is sent.
        .custom(async (classification_name) => {
            const classExists = await accountModel.checkExistingClassification(classification_name)
            if (classExists){
              throw new Error("Class exists. Please use a Another Class name ")
            }
          }),        
    ]
  }

  /* ******************************
 * Check data and return errors or continue to classification
 * ***************************** */
validate.checkclassData = async (req, res, next) => {
    const {classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,        
        
      })
      return
    }
    next()
  }


  
  module.exports = validate