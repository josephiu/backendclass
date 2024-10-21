const invModel = require("../models/inventory-model")
const Util = {}

/**
Constructs the nav HTML unordered list
********** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    // console.log(data)
    list += '<li><a href="/" tittle="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list += 
        '<a href="/inv/type/' + 
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        'vehicles">' +
        row.classification_name +
        "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }






/* **************************************
* Build the inventory div for the view HTML
* ************************************ */
Util.buildInventorydiv= async function(data){
  let V_Display
  
  if(data.length > 0){
    V_Display = '<div id="V-display">'
    V_Display += '<div id="V-detail-left">'
    
    V_Display += '<img src="'+ data[0].inv_image +'" alt="Image of'+ data[0].inv_make + ' ' + data[0].inv_model + '"> ' + '</div>'   
    
    V_Display += '<div id="V-detail-right">'
    V_Display += '<h3>' + data[0].inv_make + ' ' + data[0].inv_model + ' ' + 'Details </h3>'
    V_Display += '<p><strong>Price:</strong> $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</p>'
    V_Display += '<p><strong>Description:</strong> ' + data[0].inv_description + '</p>'
    V_Display += '<p><strong>color:</strong> ' + data[0].inv_color + '</p>'
    V_Display += '<p><strong>Miles:</strong> ' + new Intl.NumberFormat('en-US').format(data[0].inv_miles) + ' miles</p>'
    V_Display += '</div>'
    V_Display += '</div>'

  } else { 
    V_Display += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return V_Display
}









//Js code for the passowrd
// const pswdBtn = Document.querySelector("#pswBtn")
// pswdBtn.addEventLister("click", function() {
//   const pswdInput = document.getElementById("pword");
//   const type = pswdInput.getAttribute("type");
//   if (type == "password"){
//     pswdInput.setAttribute("type", "text");
//     pswdBtn.innerHTML = "Hide Password";    
//   } else {
//     pswdInput.setAttribute("type", "password");
//     pswdBtn.innerHTML = "Show password"
//   }
// })






  /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)




module.exports = Util
