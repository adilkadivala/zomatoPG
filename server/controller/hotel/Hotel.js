const connectDataBase = require("../../database/connection");
const multer = require("multer");

const imagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uplodes");
  },
  filename: (req, file, cb) => {
    cb(null`,${Date.now()}_${file.filename}`);
  },
});

const uploadImages = multer({ storage: imagePath }).single("manu");
// getting all hotels data
const gethotel = async (req, res) => {
  try {
    const Que = `SELECT * FROM services`;

    connectDataBase.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting hotelsdat" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from gethotel:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// inserting hotels data
const inserthotelData = async (req, res) => {
  try {
    const manu = req.file.filename;

    const {
      guest_house,
      meeting_hall,
      a_c_hall,
      hotel_id,
      food_delievery,
      advanse_booking,
    } = req.body;

    console.log(req.body);
    console.log(req.file.filename);

    const Que = `INSERT INTO services (guest_house, manu, meeting_hall, a_c_hall, food_delievery,advanse_booking, hotel_id) VALUES (?,?,?,?,?,?,?)`;
    const data = [
      guest_house,
      manu,
      meeting_hall,
      a_c_hall,
      food_delievery,
      advanse_booking,
      hotel_id,
    ];
    connectDataBase.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from inserting hotel data" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error inserting hotel data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// updating hotels data
const updateHotelData = async (req, res) => {
  try {
    const { id } = req.params;
    const manu = req.file.filename;

    const {
      guest_house,
      meeting_hall,
      a_c_hall,
      food_delievery,
      advanse_booking,
      hotel_id,
    } = req.body;

    const Que = `UPDATE services SET manu = ?, guest_house = ?, meeting_hall = ?, a_c_hall = ?, food_delievery = ?, advanse_booking = ?, hotel_id = ? WHERE id = ?`;

    const data = [
      manu,
      guest_house,
      meeting_hall,
      a_c_hall,
      food_delievery,
      advanse_booking,
      hotel_id,
      id,
    ];

    connectDataBase.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error occurred while updating hotel detail" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error occurred while updating hotel detail", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// deleting hotels data
const deleteHoteldata = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const Que = `DELETE FROM services WHERE id = ?`;

    connectDataBase.query(Que, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got form deletnig hotel" });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.error("Error got from delete hotel:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// getting hotels data by id
const getHotelsbyId = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const Que = `SELECT * FROM services WHERE hotel_id = ?`;

    connectDataBase.query(Que, [hotelId], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting perticular hotel by id" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from gethotel by id:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  gethotel,
  inserthotelData,
  updateHotelData,
  deleteHoteldata,
  getHotelsbyId,
};
