import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        backgroundColor: "transparent",
        height: "5rem",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "transparent",
          textAlign: "left",
        }}
      >
        <img
          alt="brand"
          src={require("../assets/images/logo.png")}
          style={{
            width: "9rem",
            height: "3rem",
            marginLeft: "1.5rem",
            mixBlendMode: "color-burn",
          }}
        />
      </div>
      <div style={{ width: "20%" }}>
        <ul
          style={{
            display: "flex",
            marginRight: "1.5rem",
            fontSize: "1.4rem",
            marginTop: "1.4rem",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="/" style={{ color: "black" }}>
            Cityies
          </NavLink>
          <NavLink to="/collection" style={{ color: "black" }}>
            Hotels
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
