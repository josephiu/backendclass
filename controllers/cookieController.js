
const cookieModel = require("../models/cookieModel");

const cookieController = {};

// Handle the consent acceptance and set the cookie without redirect
cookieController.acceptCookie = (req, res) => {
    cookieModel.setConsentCookie(res);
    res.status(200).send(); // Send a successful response without redirecting
};

module.exports = cookieController;




