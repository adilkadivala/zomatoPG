import Home from "./Home";
import Navbar from "../../components/Navbar";
import CityData from "./CityData";
import Footer from "../../components/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <Home />
      <CityData />
      <Footer />
    </>
  );
};

export default index;
