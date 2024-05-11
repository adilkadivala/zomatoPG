import React, { useState, useEffect } from "react";
import "../../assets/style/admin/main.css";
import axios from "axios";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { toast } from "react-toastify";
import { DeleteModal } from "../../components/admin/Modal";
import { useHotelContext } from "../../store/HotelDetails";

const Addhotel = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const { hotelData, setHotelData } = useHotelContext();
  const [insertHotelDetail, setInserthotelDetail] = useState({
    manu: null,
    guest_house: "",
    meeting_hall: "",
    a_c_hall: "",
    food_delievery: "",
    advanse_booking: "",
    hotel_id: "",
  });

  const [updateHotelDetail, setUpdatehotelDetail] = useState({
    manu: null,
    guest_house: "",
    meeting_hall: "",
    a_c_hall: "",
    food_delievery: "",
    advanse_booking: "",
    hotel_id: "",
  });
  const { hotelCollection } = useHotelContext();
  const [hotelId, setHotelId] = useState(null);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // inserting new collection data

  // sidebar toggle
  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  // darkmode handler
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // deleting hotel data
  const deleteHotel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5880/deletehoteldata/${hotelId}`
      );
      if (response.status === 200) {
        const updateData = await axios.get("http://localhost:5880/gethotel");
        const refreshData = await updateData.data;
        setHotelData(refreshData);
        closeDeleteModal();
        toast.success("Hotel Deleted successfully");
      } else {
        toast.error("Delete process failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // open edit modal
  const openEditModal = (hotelDetail) => {
    seteditModalOpen(true);
    setUpdatehotelDetail({
      ...updateHotelDetail,
      id: hotelDetail.id,
      manu: hotelDetail.manu,
      guest_house: hotelDetail.guest_house,
      meeting_hall: hotelDetail.meeting_hall,
      a_c_hall: hotelDetail.a_c_hall,
      food_delievery: hotelDetail.food_delievery,
      advanse_booking: hotelDetail.advanse_booking,
      hotel_id: hotelDetail.hotel_id,
    });
  };

  // close edit modal
  const closeEditModal = () => {
    seteditModalOpen(false);
  };

  // insert perticular hotel data
  const insertHotelData = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("manu", insertHotelDetail.manu);
      formdata.append("guest_house", insertHotelDetail.guest_house);
      formdata.append("meeting_hall", insertHotelDetail.meeting_hall);
      formdata.append("a_c_hall", insertHotelDetail.a_c_hall);
      formdata.append("food_delievery", insertHotelDetail.food_delievery);
      formdata.append("advanse_booking", insertHotelDetail.advanse_booking);
      formdata.append("hotel_id", insertHotelDetail.hotel_id);

      const response = await axios.post(
        "http://localhost:5880/inserthoteldata",
        formdata
      );

      if (response.status === 200) {
        const updateData = await axios.get("http://localhost:5880/gethotel");
        const refreshData = await updateData.data;
        setHotelData(refreshData);

        setInserthotelDetail({
          manu: "",
          guest_house: "",
          meeting_hall: "",
          a_c_hall: "",
          food_delievery: "",
          advanse_booking: "",
          hotel_id: "",
        });
        toast.success("Hotel detail added successfully");
        closeInsertModal();
      } else {
        console.error("error form inserting new collection");
        toast.error("Collection failed due to some reason");
      }
    } catch (error) {
      console.error("Skill Update", error.message);
    }
  };

  // update perticular hotel data
  const updateHotelData = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("manu", updateHotelDetail.manu);
    formdata.append("guest_house", updateHotelDetail.guest_house);
    formdata.append("meeting_hall", updateHotelDetail.meeting_hall);
    formdata.append("a_c_hall", updateHotelDetail.a_c_hall);
    formdata.append("food_delievery", updateHotelDetail.food_delievery);
    formdata.append("advanse_booking", updateHotelDetail.advanse_booking);
    formdata.append("hotel_id", updateHotelDetail.hotel_id);

    try {
      const response = await axios.put(
        `http://localhost:5880/updatehoteldata/${updateHotelDetail.id}`,
        formdata
      );

      if (response.status === 200) {
        const updateData = await axios.get("http://localhost:5880/gethotel");
        const refreshData = await updateData.data;
        setHotelData(refreshData);
        setUpdatehotelDetail({
          manu: "",
          guest_house: "",
          meeting_hall: "",
          a_c_hall: "",
          food_delievery: "",
          advanse_booking: "",
          hotel_id: "",
        });
        toast.success("Hotel detail added successfully");
        closeEditModal();
      } else {
        toast.error("Error fetched form updating hotel detail");
      }
    } catch (error) {
      console.error("Hotel detail Update", error.message);
    }
  };

  // insert input handler
  const insertInputhandler = async (e) => {
    if (e.target.name === "manu") {
      setInserthotelDetail({
        ...insertHotelDetail,
        manu: e.target.files[0],
      });
    } else {
      const { value, name } = e.target;
      setInserthotelDetail({
        ...insertHotelDetail,
        [name]: value,
      });
    }
  };

  // update input handler
  const updateInputHandler = async (e) => {
    if (e.target.name === "manu") {
      setUpdatehotelDetail({
        ...updateHotelDetail,
        manu: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;
      setUpdatehotelDetail({
        ...updateHotelDetail,
        [name]: value,
      });
    }
  };

  // opennig insert modal
  const openInsertModal = () => {
    setInsertModalOpen(true);
  };

  // closing insert modal
  const closeInsertModal = () => {
    setInsertModalOpen(false);
  };

  // delete modal
  const openDeleteModal = (hotelId) => {
    setDeleteModalOpen(true);
    console.log(hotelId);
    setHotelId(hotelId);
  };

  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Sidebar isOpen={!sidebarHidden} />
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteHotel}
        itemId={hotelId}
      />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left"></div>
            <button
              onClick={openInsertModal}
              className="btn-download"
              style={{ border: "none", cursor: "pointer" }}
            >
              <span className="text">Add a new Hotel</span>
            </button>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Hotel Collection</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table style={{ width: "60rem" }}>
                <thead>
                  <tr>
                    <th>Manu</th>
                    <th>Hotel Name</th>
                    <th>Guest House</th>
                    <th>A.C Hall</th>
                    <th>Meeting Hall</th>
                    <th>Food Delievery</th>
                    <th>Advance Booking</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelData &&
                    hotelData.map((hotel) => {
                      const hotel_detail = hotelCollection.find(
                        (collection) => collection.id === hotel.hotel_id
                      );

                      return (
                        <>
                          <tr key={hotel.id}>
                            <td>
                              <img
                                src={`/uplodes/${hotel.manu}`}
                                alt="Hotel Banner"
                              />
                            </td>
                            <td>
                              <p>
                                {hotel_detail
                                  ? hotel_detail.hotel_name
                                  : "unknown"}
                              </p>
                            </td>
                            <td>
                              <p>{hotel.guest_house}</p>
                            </td>
                            <td>
                              <p>{hotel.a_c_hall}</p>
                            </td>
                            <td>
                              <p>{hotel.meeting_hall}</p>
                            </td>
                            <td>
                              <p>{hotel.food_delievery}</p>
                            </td>
                            <td>
                              <p>{hotel.advanse_booking}</p>
                            </td>
                            <td>
                              <button
                                className="status completed"
                                onClick={() => openEditModal(hotel)}
                                style={{
                                  marginRight: "5px",
                                  width: "40px",
                                  height: "40px",
                                  border: "none",
                                  cursor: "pointer",
                                  borderRadius: "15px",
                                  backgroundColor: "#3c91e6",
                                }}
                              >
                                <i
                                  className="fa-solid fa-pen"
                                  style={{
                                    fontSize: "16px",
                                    color: "white",
                                    marginLeft: "-3px",
                                  }}
                                ></i>
                              </button>
                              <button
                                type="button"
                                onClick={() => openDeleteModal(hotel.id)}
                                className="status pending"
                                style={{
                                  marginRight: "5px",
                                  width: "40px",
                                  cursor: "pointer",
                                  height: "40px",
                                  border: "none",
                                  borderRadius: "15px",
                                  backgroundColor: "#fd7238",
                                }}
                              >
                                <i
                                  className="fa-solid fa-trash"
                                  style={{
                                    fontSize: "16px",
                                    color: "white",
                                    marginLeft: "-3px",
                                  }}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>

      {/* insert modal */}
      <div
        style={{
          display: insertModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflow: "hidden",
          left: "480px",
          width: "35%",
          height: "25rem",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: "15px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <button
                type="button"
                style={{
                  backgroundColor: "#db504a",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  cursor: "pointer",
                  padding: "7px 10px",
                  right: "0",
                }}
                onClick={closeInsertModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div>
              <p>Insert Hotel Detail</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="add form"
                onSubmit={insertHotelData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="manu" className="form-label">
                    Hotel Manu
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="manu"
                    name="manu"
                    onChange={insertInputhandler}
                    placeholder="Enter Hotel manu Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="guest_house" className="form-label">
                    Hotel Guest House
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertHotelDetail.guest_house}
                    id="guest_house"
                    name="guest_house"
                    onChange={insertInputhandler}
                    placeholder="Enter Hotel name Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="meeting_hall" className="form-label">
                    Meeting Hall
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertHotelDetail.meeting_hall}
                    id="meeting_hall"
                    name="meeting_hall"
                    onChange={insertInputhandler}
                    placeholder="Enter Address Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="a_c_hall" className="form-label">
                    a_c_hall
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="a_c_hall"
                    value={insertHotelDetail.a_c_hall}
                    name="a_c_hall"
                    onChange={insertInputhandler}
                    placeholder="Enter a_c_hall Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="food_delievery" className="form-label">
                    food_delievery
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="food_delievery"
                    value={insertHotelDetail.food_delievery}
                    name="food_delievery"
                    onChange={insertInputhandler}
                    placeholder="Enter food_delievery Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="advanse_booking" className="form-label">
                    advanse_booking
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="advanse_booking"
                    value={insertHotelDetail.advanse_booking}
                    name="advanse_booking"
                    onChange={insertInputhandler}
                    placeholder="Enter advanse_booking Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="hotel_id" className="form-label">
                    Choose Hotel
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertHotelDetail.hotel_id}
                    id="hotel_id"
                    name="hotel_id"
                    onChange={insertInputhandler}
                    placeholder="Enter Hotel id Here"
                  >
                    <option value="">Select Hotel</option>

                    {hotelCollection &&
                      hotelCollection.map((collection) => {
                        return (
                          <option key={collection.id} value={collection.id}>
                            {collection.hotel_name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    type="reset"
                    style={{
                      backgroundColor: "#3c91e6",
                      border: "none",
                      color: "#FFF",
                      marginRight: "5px",
                      padding: "7px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onClick={closeInsertModal}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* update modal */}
      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflow: "hidden",
          left: "480px",
          width: "35%",
          height: "25rem",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: "15px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <button
                type="button"
                style={{
                  backgroundColor: "#db504a",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  cursor: "pointer",
                  padding: "7px 10px",
                  right: "0",
                }}
                onClick={closeEditModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div>
              <p>Insert Hotel Detail</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="add form"
                onSubmit={updateHotelData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="manu" className="form-label">
                    Hotel Manu
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="manu"
                    name="manu"
                    onChange={updateInputHandler}
                    placeholder="Enter Hotel manu Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="guest_house" className="form-label">
                    Hotel Guest House
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateHotelDetail.guest_house}
                    id="guest_house"
                    name="guest_house"
                    onChange={updateInputHandler}
                    placeholder="Enter Hotel name Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="meeting_hall" className="form-label">
                    Meeting Hall
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateHotelDetail.meeting_hall}
                    id="meeting_hall"
                    name="meeting_hall"
                    onChange={updateInputHandler}
                    placeholder="Enter Address Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="a_c_hall" className="form-label">
                    a_c_hall
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="a_c_hall"
                    value={updateHotelDetail.a_c_hall}
                    name="a_c_hall"
                    onChange={updateInputHandler}
                    placeholder="Enter a_c_hall Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="food_delievery" className="form-label">
                    food_delievery
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="food_delievery"
                    value={updateHotelDetail.food_delievery}
                    name="food_delievery"
                    onChange={updateInputHandler}
                    placeholder="Enter food_delievery Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="advanse_booking" className="form-label">
                    advanse_booking
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    id="advanse_booking"
                    value={updateHotelDetail.advanse_booking}
                    name="advanse_booking"
                    onChange={updateInputHandler}
                    placeholder="Enter advanse_booking Detail Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="hotel_id" className="form-label">
                    Choose Hotel
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateHotelDetail.hotel_id}
                    id="hotel_id"
                    name="hotel_id"
                    onChange={updateInputHandler}
                    placeholder="Enter Hotel id Here"
                  >
                    <option value="">Select Hotel</option>

                    {hotelCollection &&
                      hotelCollection.map((collection) => {
                        return (
                          <option key={collection.id} value={collection.id}>
                            {collection.hotel_name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    type="reset"
                    style={{
                      backgroundColor: "#3c91e6",
                      border: "none",
                      color: "#FFF",
                      marginRight: "5px",
                      padding: "7px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onClick={closeEditModal}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addhotel;
