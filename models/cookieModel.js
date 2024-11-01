
const cookieModel = {};

// Set the consent cookie
cookieModel.setConsentCookie = (res) => {
    res.cookie("acceptedCookies", "true", { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
};

module.exports = cookieModel;



