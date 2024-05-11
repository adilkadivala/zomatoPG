import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Hero from "./Hero";
import { NavLink } from "react-router-dom";

const Root = () => {
  const [hotelcollection, setHotelcollection] = useState();

  const getcollectionList = async () => {
    try {
      const response = await axios.get("http://localhost:5880/getcollection");
      setHotelcollection(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getcollectionList();
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
        <Card>
          {hotelcollection &&
            hotelcollection.map((coll) => {
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

export default Root;
