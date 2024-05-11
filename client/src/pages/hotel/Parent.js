import Hero from "../colletion/Hero";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Parent = () => {
  const [hotelsInCity, setHotelsInCity] = useState();
  const { cityId } = useParams();

  const getHotelsofCity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5880/getcollection/${cityId}`
      );
      setHotelsInCity(response.data);
    } catch (error) {
      console.error("Error from getting hotels of cities", error);
    }
  };

  useEffect(() => {
    getHotelsofCity();
  }, [cityId]);

  return (
    <>
      <Navbar />
      <Hero />
      <div>
        <h1>Welcome</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Card>
          {hotelsInCity &&
            hotelsInCity.map((coll) => {
              return (
                <>
                  <NavLink
                    to={`/singlehotel/${coll.id}`}
                    style={{ color: "black" }}
                  >
                    <img
                      src={`/uplodes/${coll.hotel_banner}`}
                      alt="card banner"
                      style={{ height: "15rem" }}
                    />

                    <div style={{ padding: "2rem" }}>
                      <section
                        style={{
                          display: "flex",
                          columnGap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Hotel Name :</span>
                        <h4>{coll.hotel_name}</h4>
                      </section>
                      <br />
                      <section
                        style={{
                          display: "flex",
                          columnGap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Category : </span>
                        <p>{coll.category}</p>
                      </section>

                      <section
                        style={{
                          display: "flex",
                          columnGap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Address :</span>
                        <p>{coll.short_add}</p>
                      </section>
                      <section
                        style={{
                          display: "flex",
                          columnGap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Prize :</span>
                        <p>{coll.prize}</p>
                      </section>
                    </div>
                  </NavLink>
                </>
              );
            })}
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Parent;
