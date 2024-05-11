const connectDatabase = require("../../database/connection");
const multer = require("multer");

const imageProcess = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uplodes");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.filename}`);
  },
});

const uplodeImage = multer({ storage: imageProcess }).single("hotel_banner");

// getting hotels all data
const getHotelsCollection = async (req, res) => {
  try {
    const Que = `SELECT * FROM collection`;

    connectDatabase.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "errore got from getting Hotels Collection" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// inserting hotels data
const addhotelCollection = async (req, res) => {
  try {
    const hotel_banner = req.file.filename;
    const { hotel_name, category, short_add, prize, city_id } = req.body;

    const Que =
      "INSERT INTO collection (hotel_banner,hotel_name,category,short_add,prize,city_id) VALUES(?,?,?,?,?,?)";
    const data = [
      hotel_banner,
      hotel_name,
      category,
      short_add,
      prize,
      city_id,
    ];

    connectDatabase.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from adding collection of hotels" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// deleting hotels data
const deleteColllection = async (req, res) => {
  try {
    const { id } = req.params;

    const Que = `DELETE FROM collection WHERE id = ?`;

    connectDatabase.query(Que, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "errore from deletnig collecton" });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// updating hotels data
const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel_banner = req.file.filename;

    const { hotel_name, category, short_add, prize, city_id } = req.body;

    const Que = `UPDATE collection SET hotel_banner = ?, hotel_name=?,category=?,short_add=?,prize=?,city_id=? WHERE id = ?`;

    const data = [
      hotel_banner,
      hotel_name,
      category,
      short_add,
      prize,
      city_id,
      id,
    ];

    connectDatabase.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got form updating collection" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from updating collection", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// getting hotels data on city name
const getCollectionByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const Que = `SELECT * FROM collection WHERE city_id = ?`;

    connectDatabase.query(Que, [cityId], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error got form getting collection by city" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getHotelsCollection,
  addhotelCollection,
  deleteColllection,
  updateCollection,
  getCollectionByCity,
};
