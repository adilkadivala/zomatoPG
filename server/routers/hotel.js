const express = require("express");
const router = express.Router();
const multer = require("multer");
const hoteldetail = require("../controller/hotel/Hotel");

// Multer configuration for images
const imagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../hotel/client/public/uplodes");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadImages = multer({ storage: imagePath });

router.route("/gethotel").get(hoteldetail.gethotel);

// Route for inserting hotel data
router
  .route("/inserthoteldata")
  .post(uploadImages.single("manu"), hoteldetail.inserthotelData);

// Route for updating hotel data
router
  .route("/updatehoteldata/:id")
  .put(uploadImages.single("manu"), hoteldetail.updateHotelData);

router.route("/deletehoteldata/:id").delete(hoteldetail.deleteHoteldata);
router.route("/gethotelbyid/:hotelId").get(hoteldetail.getHotelsbyId);

module.exports = router;