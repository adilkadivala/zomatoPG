import { Routes, Route } from "react-router-dom";
import Index from "../pages/home/Index";
import Root from "../pages/colletion/Root";
import Main from "../pages/admin/Main";
import Addcity from "../pages/admin/Addcity";
import Addcolletion from "../pages/admin/Addcollection";
import Addhotel from "../pages/admin/Addhotel";
import Parent from "../pages/hotel/Parent";
import Personal from "../pages/hotel/Personal";

const Paths = () => {
  return (
    <>
      <Routes>
        {/* pages */}
        <Route
          path="/"
          element={
            <>
              <Index />
            </>
          }
        />
        <Route
          path="/collection"
          element={
            <>
              <Root />
            </>
          }
        />
        <Route
          path="/hotelsincity/:cityId"
          element={
            <>
              <Parent />
            </>
          }
        />
        <Route
          path="/singlehotel/:hotelId"
          element={
            <>
              <Personal />
            </>
          }
        />

        {/* admin */}

        <Route
          path="/dashboard"
          element={
            <>
              <Main />
            </>
          }
        />
        <Route
          path="/addcity"
          element={
            <>
              <Addcity />
            </>
          }
        />
        <Route
          path="/addcollection"
          element={
            <>
              <Addcolletion />
            </>
          }
        />
        <Route
          path="/hoteldetail"
          element={
            <>
              <Addhotel />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Paths;
