import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const HotelContext = createContext();

// Custom hook to consume context
export const useHotelContext = () => useContext(HotelContext);

// Context provider component
export const HotelProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);
  const [hotelCollection, setHotelCollection] = useState([]);
  const [hotelData, setHotelData] = useState([]);

  // city data
  const getCityList = async () => {
    try {
      const response = await axios.get("http://localhost:5880/getcitylist");
      setCityList(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // collection of hotels
  const getCollectionList = async () => {
    try {
      const response = await axios.get("http://localhost:5880/getcollection");
      setHotelCollection(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // hotel data

  const gethotels = async () => {
    try {
      const response = await axios.get("http://localhost:5880/gethotel");
      setHotelData(response.data);
    } catch (error) {
      console.error("error got form context of hotal data", error);
    }
  };

  useEffect(() => {
    getCityList();
    getCollectionList();
    gethotels();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        cityList,
        setCityList,
        hotelCollection,
        setHotelCollection,
        hotelData,
        setHotelData,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
