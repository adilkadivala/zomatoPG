const express = require("express");
const router = express.Router();
const citylist = require("../controller/home/CityList");

router.route("/getcitylist").get(citylist.getCity);
router.route("/entercity").post(citylist.enterCity);
router.route("/deletecity/:id").delete(citylist.deleteCity);
router.route("/updatecity/:id").put(citylist.updateCity);

module.exports = router;