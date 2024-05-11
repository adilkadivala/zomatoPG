const express = require("express");
const router = express.Router();
const multer = require("multer");
const hotelcollection = require("../controller/collection/Collection");

const imageProcess = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uplodes");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: imageProcess });

router.route("/getcollection").get(hotelcollection.getHotelsCollection);
router
  .route("/insertcollection")
  .post(upload.single("hotel_banner"), hotelcollection.addhotelCollection);
router.route("/deletecollection/:id").delete(hotelcollection.deleteColllection);
router
  .route("/updatecollection/:id")
  .put(upload.single("hotel_banner"), hotelcollection.updateCollection);
router.route("/getcollection/:cityId").get(hotelcollection.getCollectionByCity);

module.exports = router;
