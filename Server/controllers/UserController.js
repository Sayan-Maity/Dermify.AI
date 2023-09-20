const User = require("../models/UserModel");
require("dotenv").config();

// Save user search disease history
module.exports.diseaseHistory = async (req, res) => {
    const { email, firstname, lastname } = req.body;
    try {
    }
    catch (err) {
        console.log(err)
    }
}