import React from "react";
import "../../assets/style/style.css";

const Home = () => {
  return (
    <>
      <div className="hero_background"></div>
      <div className="hero_text">
        <p style={{ fontSize: "6rem", fontWeight: "bolder" }}>Zomato </p>
        <p style={{ fontSize: "1.2rem", fontWeight: "bolder" }}>
          Find the best restaurants, cafés and bars in India
        </p>
      </div>
    </>
  );
};

export default Home;
