const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */

async function getInventoryByInventory_id(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
      WHERE classification_id = $1`,
      [inventory_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByInventory_id " + error)
  }
}






// Line 13 - declares an asynchronous function by name and passes a variable, which should contain the classification_id value, as a parameter.
// Line 14 - opens a try - catch block.
// Lines 15-21 - creates an SQL query to read the inventory and classification information from their respective tables using an INNER JOIN. The query is written using a prepared statement. The "$1" is a placeholder, which will be replaced by the value shown in the brackets "[]" when the SQL statement is run. The SQL is queried against the database via the database pool. Note the await keyword, which means this query will wait for the information to be returned, where it will be stored in the data variable.
// Line 22 - sends the data, as an array of all the rows, back to where the function was called (in the controller).
// Line 23 - ends the try and opens the catch, with an error variable being supplied to store any error that may occur.
// Line 24 - writes the error, if any, to the console for us to read. We will have to deal with a better error handler in the future.
// Line 25 - closes the catch block.
// Line 26 - ends the function.



module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventory_id };