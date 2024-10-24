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
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.inv_id = $1`,
      [inventory_id]
    )
    // console.log(data.rows)
    return data.rows
   
  } catch (error) {
    console.error("getInventoryByInventory_id " + error)
  }
}



/* *****************************
*   Add new  classification
* *************************** */
async function AddClassification(classification_name){
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
   
  } catch (error) {
    return error.message
    
  }
}






/* **********************
*   Check for existing classification
* ********************* */
async function checkExistingClassification(classification_name){
try {
  const sql = "SELECT * FROM  classification WHERE classification_name = $1"
  const className = await pool.query(sql, [classification_name])

  console.log(className.rowCount)
  return className.rowCount
  


} catch (error) {
  return error.message
}
}





module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventory_id, AddClassification, checkExistingClassification };