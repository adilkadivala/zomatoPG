import { NavLink } from "react-router-dom";

const CityCard = ({ children, cityId }) => {
  return (
    <>
      <NavLink
        to={`/hotelsincity/${cityId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            width: "20rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 2.3rem",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "1.3rem",
            height: "3.5rem",
            border: "1px solid #000",
            backgroundColor: "white",
            borderRadius: ".5rem",
          }}
        >
          {children}
          <i className="fa-solid fa-caret-right"></i>
        </div>
      </NavLink>
    </>
  );
};

export default CityCard;
