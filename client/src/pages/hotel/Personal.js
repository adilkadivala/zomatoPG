import Hero from "../colletion/Hero";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Personal = () => {
  const [hotelData, setHotelData] = useState();
  const { hotelId } = useParams();

  const getDataofHotels = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5880/gethotelbyid/${hotelId}`
      );
      setHotelData(response.data);
    } catch (error) {
      console.error("Error from getting hotels of cities", error);
    }
  };

  useEffect(() => {
    getDataofHotels();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {hotelData &&
          hotelData.map((data) => {
            return (
              <>
                <div
                  style={{
                    marginTop: "5rem",
                    width: "50rem",
                    height: "auto", 
                    overflow: "hidden",
                    marginBottom: "5rem",
                  }}
                >
                  <img src={`/uplodes/${data.manu}`} alt="hotel banner" />
                </div>
                <div style={{ padding: "2rem", width: "50rem" }}>
                  <table
                    border={1}
                    style={{
                      width: "50rem",
                      tableLayout: "auto",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Guest House</th>
                        <th> Meeting Hall</th>
                        <th>A C hall</th>
                        <th>Food Delievery</th>
                        <th>Advanse booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.guest_house}</td>
                        <td>{data.meeting_hall}</td>
                        <td>{data.a_c_hall}</td>
                        <td>{data.food_delievery}</td>
                        <td>{data.advanse_booking}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
      </div>
      <Footer />
    </>
  );
};

export default Personal;
