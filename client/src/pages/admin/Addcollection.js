import React, { useState, useEffect } from "react";
import "../../assets/style/admin/main.css";
import axios from "axios";
import { useHotelContext } from "../../store/HotelDetails";
import { toast } from "react-toastify";
import { DeleteModal } from "../../components/admin/Modal";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";

const Addcollection = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { cityList } = useHotelContext();
  const { hotelCollection, setHotelCollection } = useHotelContext();
  const [updateCollection, setUpdateCollection] = useState({
    hotel_name: "",
    category: "",
    short_add: " ",
    hotel_banner: null,
    prize: "",
    city_id: "",
  });
  const [insertCollection, setInsertCollection] = useState({
    hotel_name: "",
    category: "",
    short_add: " ",
    hotel_banner: null,
    prize: "",
    city_id: "",
  });
  const [collectionId, setCollectionId] = useState(null);

  // inserting new collection data
  const insertCollectionList = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("hotel_name", insertCollection.hotel_name);
      formdata.append("category", insertCollection.category);
      formdata.append("short_add", insertCollection.short_add);
      formdata.append("hotel_banner", insertCollection.hotel_banner);
      formdata.append("prize", insertCollection.prize);
      formdata.append("city_id", insertCollection.city_id);

      const response = await axios.post(
        "http://localhost:5880/insertcollection",
        formdata
      );

      if (response.status === 200) {
        const updatedDataResponse = await axios.get(
          "http://localhost:5880/getcollection"
        );
        const updatedData = updatedDataResponse.data;
        setHotelCollection(updatedData);
        setInsertCollection({
          hotel_name: "",
          category: "",
          short_add: " ",
          hotel_banner: "",
          prize: "",
          city_id: "",
        });
        toast.success("Collection added successfully");
        closeInsertModal();
      } else {
        console.error("error form inserting new collection");
        toast.error("Collection failed due to some reason");
      }
    } catch (error) {
      console.error("Skill Update", error.message);
    }
  };

  // updating collection
  const handleUpdateCollection = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("hotel_name", updateCollection.hotel_name);
    formdata.append("category", updateCollection.category);
    formdata.append("short_add", updateCollection.short_add);
    formdata.append("hotel_banner", updateCollection.hotel_banner);
    formdata.append("prize", updateCollection.prize);
    formdata.append("city_id", updateCollection.city_id);

    try {
      const response = await axios.put(
        `http://localhost:5880/updatecollection/${updateCollection.id}`,
        formdata
      );

      if (response.status === 200) {
        const updatedDataResponse = await axios.get(
          "http://localhost:5880/getcollection"
        );
        const updatedData = await updatedDataResponse.data;

        setUpdateCollection({
          hotel_name: "",
          category: "",
          short_add: " ",
          hotel_banner: "",
          prize: "",
          city_id: "",
        });
        setHotelCollection(updatedData);

        toast.success("Collection updated successfully");
        closeEditModal();
      } else {
        console.error("error form inserting new collection");
        toast.error("updating Collection failed due to some reason");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // deleting collection
  const deleteCollection = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5880/deletecollection/${collectionId}`
      );
      if (response.status === 200) {
        const updatedDataResponse = await axios.get(
          "http://localhost:5880/getcollection"
        );
        const updatedData = await updatedDataResponse.data;
        setHotelCollection(updatedData);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // sidebar toggle
  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  // darkmode handler
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // insert input handler
  const handleInput = (e) => {
    if (e.target.name === "hotel_banner") {
      setInsertCollection({
        ...insertCollection,
        hotel_banner: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;

      setInsertCollection({
        ...insertCollection,
        [name]: value,
      });
    }
  };

  // update input handler
  const updateInputHandler = (e) => {
    if (e.target.name === "hotel_banner") {
      setUpdateCollection({
        ...updateCollection,
        hotel_banner: e.target.files[0],
      });
    } else {
      const { name, value } = e.target;

      setUpdateCollection({
        ...updateCollection,
        [name]: value,
      });
    }
  };

  // edit modal
  const openEditModal = (collections) => {
    seteditModalOpen(true);
    setUpdateCollection({
      ...updateCollection,
      id: collections.id,
      hotel_name: collections.hotel_name,
      category: collections.category,
      short_add: collections.short_add,
      hotel_banner: collections.hotel_banner,
      prize: collections.prize,
      city_id: collections.city_id,
    });
  };

  // Close Edit modal
  const closeEditModal = () => {
    seteditModalOpen(false);
  };

  // insert modal
  const openInsertModal = () => {
    setInsertModalOpen(true);
  };
  // closing insert modal
  const closeInsertModal = () => {
    setInsertModalOpen(false);
  };

  // delete modal
  const openDeleteModal = (collectionId) => {
    setDeleteModalOpen(true);
    setCollectionId(collectionId);
  };

  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCollectionId(null);
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
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteCollection}
        itemId={collectionId}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              {/* <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul> */}
            </div>
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
                    <th>Image</th>
                    <th>Hotel Name</th>
                    <th>Category</th>
                    <th>Short Add</th>
                    <th>Prize</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelCollection &&
                    hotelCollection.map((collection) => {
                      const city = cityList.find(
                        (city) => city.id === collection.city_id
                      );

                      return (
                        <>
                          <tr key={collection.id}>
                            <td>
                              <img
                                src={`/uplodes/${collection.hotel_banner}`}
                                alt="Hotel Banner"
                              />
                            </td>
                            <td>
                              <p>{collection.hotel_name}</p>
                            </td>
                            <td>
                              <p>{collection.category}</p>
                            </td>
                            <td>
                              <p>{collection.short_add}</p>
                            </td>
                            <td>
                              <p>{collection.prize}</p>
                            </td>
                            <td>
                              <p>{city ? city.city_name : "unknown"}</p>
                            </td>
                            <td>
                              <button
                                className="status completed"
                                onClick={() => openEditModal(collection)}
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
                                onClick={() => openDeleteModal(collection.id)}
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
              <p>Insert Skill</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="add form"
                onSubmit={insertCollectionList}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="hotel_name" className="form-label">
                    Hotel Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertCollection.hotel_name}
                    id="hotel_name"
                    name="hotel_name"
                    onChange={handleInput}
                    placeholder="Enter Hotel name Here"
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertCollection.category}
                    id="category"
                    name="category"
                    onChange={handleInput}
                    placeholder="Enter Category Here"
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="short_add" className="form-label">
                    Short Address
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertCollection.short_add}
                    id="short_add"
                    name="short_add"
                    onChange={handleInput}
                    placeholder="Enter Address Here"
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="hotel_banner" className="form-label">
                    Hotel Image
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="hotel_banner"
                    name="hotel_banner"
                    onChange={handleInput}
                    placeholder="Enter Hotel Image Here"
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="prize" className="form-label">
                    Prize
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="number"
                    className="form-control"
                    value={insertCollection.prize}
                    id="prize"
                    name="prize"
                    onChange={handleInput}
                    placeholder="Enter Prize Here"
                  />
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="city_id" className="form-label">
                    Choose City
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={insertCollection.city_id}
                    id="city_id"
                    name="city_id"
                    onChange={handleInput}
                    placeholder="Enter City name Here"
                  >
                    <option value="">Select City</option>

                    {cityList &&
                      cityList.map((city) => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.city_name}
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
          top: "8rem",
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
              <p>Update Skill</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                onSubmit={handleUpdateCollection}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="hotel_name" className="form-label">
                    Hotel Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateCollection.hotel_name}
                    id="hotel_name"
                    name="hotel_name"
                    onChange={updateInputHandler}
                    placeholder="Enter Hotel name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="category" className="form-label">
                    category
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateCollection.category}
                    id="category"
                    name="category"
                    onChange={updateInputHandler}
                    placeholder="Enter category Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="short_add" className="form-label">
                    Short Address
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateCollection.short_add}
                    id="short_add"
                    name="short_add"
                    onChange={updateInputHandler}
                    placeholder="Enter Address Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="hotel_banner" className="form-label">
                    hotel_banner
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="file"
                    className="form-control"
                    id="hotel_banner"
                    name="hotel_banner"
                    onChange={updateInputHandler}
                    placeholder="Ente Hotel Image Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="prize" className="form-label">
                    Prize
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="number"
                    className="form-control"
                    value={updateCollection.prize}
                    id="prize"
                    name="prize"
                    onChange={updateInputHandler}
                    placeholder="Enter Prize Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="city_id" className="form-label">
                    Choose City
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateCollection.city_id}
                    id="city_id"
                    name="city_id"
                    onChange={updateInputHandler}
                    placeholder="Update City name Here"
                  >
                    <option value="">Select City</option>

                    {cityList &&
                      cityList.map((city) => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.city_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </form>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
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
                onClick={handleUpdateCollection}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcollection;
