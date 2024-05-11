const connectDatabase = require("../../database/connection");

// getting cities for showing thier hotels
const getCity = async (req, res) => {
  try {
    const Que = `SELECT * FROM city_list`;

    connectDatabase.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "error got from getting cities" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Enetr CIty
const enterCity = async (req, res) => {
  try {
    const { city_name } = req.body;

    const Que = `INSERT INTO city_list (city_name) VALUES (?)`;

    const data = [city_name];

    connectDatabase.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Errore got from Entering City" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from entercity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete city
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const Que = `DELETE FROM city_list WHERE id = ? `;

    connectDatabase.query(Que, [id], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "errore got form deleting city" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    console.error("Error got from getcity:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update city
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { city_name } = req.body;

    const Que = `UPDATE city_list SET city_name = ? WHERE id = ?`;
    const data = [city_name, id];

    connectDatabase.query(Que, data, (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Errore got from updating city" });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.error("Error got from updating city:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCity,
  enterCity,
  deleteCity,
  updateCity,
};
