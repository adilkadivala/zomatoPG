import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
// import { useHotelContext } from "../../store/HotelDetails";
import { toast } from "react-toastify";
import { DeleteModal } from "../../components/admin/Modal";
import { useState, useEffect } from "react";

const Addcity = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [enterCity, setEnterCity] = useState({
    city_name: "",
  });
  const [updateCityname, setUpdateCityname] = useState({
    city_name: "",
  });

  //   get city
  const getCityies = async () => {
    try {
      const response = await axios.get("http://localhost:5880/getcitylist");
      setCity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //   enter city
  const handleNewCity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5880/entercity",
        enterCity
      );

      const res_data = await response.data;

      if (response.status === 200) {
        setEnterCity({
          city_name: "",
        });
        getCityies();
        toast.success("City added successfully");
      } else {
        console.error("error from entering new client");
        toast.error("error from entering new client");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // deletecity
  const deleteCity = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5880/deletecity/${cityId}`
      );
      if (response.status === 200) {
        getCityies();
        closeDeleteModal();
        toast.success("City Deleted Succefully");
      } else {
        console.log(`Failed to delete City: ${response.status}`);
        toast.error("Failed to delete City");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // updatecity
  const handleUpdateCity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5880/updatecity/${updateCityname.id}`,
        updateCityname
      );
      // const res_data = await response.data;
      if (response.status === 200) {
        setUpdateCityname({
          city_name: "",
        });
        getCityies();
        toast.success("City Updated successfully");
        closeEditModal();
      } else {
        console.error("error from entering new client");
        toast.error("error from entering new client");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // input handler
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setEnterCity({
      ...enterCity,
      [name]: value,
    });
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

  // open Delete modal
  const openDeleteModal = (cityId) => {
    setDeleteModalOpen(true);
    setCityId(cityId);
  };

  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCityId(null);
  };

  // edit modal
  const openEditModal = (city) => {
    console.log("modal-id", city.id);
    seteditModalOpen(true);
    setUpdateCityname({
      ...updateCityname,
      id: city.id,
      city_name: city.city_name,
    });
  };

  // Close Edit modal
  const closeEditModal = () => {
    seteditModalOpen(false);
  };

  useEffect(() => {
    getCityies();
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
        onDelete={deleteCity}
        itemId={cityId}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Add Cities</h1>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </a>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>City List</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>City Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {city &&
                    city.map((cityname) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <p>{cityname.id}</p>
                            </td>
                            <td>
                              <p> {cityname.city_name}</p>
                            </td>
                            <td>
                              <button
                                className="status completed"
                                onClick={() => openEditModal(cityname)}
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
                                onClick={() => openDeleteModal(cityname.id)}
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

            <div className="todo">
              <div className="head">
                <h3>Add City</h3>
                <i className="bx bx-plus"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="add form"
                  onSubmit={handleNewCity}
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
                    <label htmlFor="city_name" className="form-label">
                      City Name
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={enterCity.city_name}
                      id="city_name"
                      name="city_name"
                      onChange={inputHandler}
                      placeholder="Enter City name Here"
                    />
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
        </main>
      </section>

      {/* edit modal */}
      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "15rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflow: "hidden",
          left: "480px",
          width: "35%",
          height: "auto",
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
                onSubmit={handleUpdateCity}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="city_name" className="form-label">
                    city_name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateCityname.city_name}
                    id="city_name"
                    name="city_name"
                    onChange={(e) => {
                      setUpdateCityname({
                        ...updateCityname,
                        city_name: e.target.value,
                      });
                    }}
                    placeholder="Enter City name Here"
                  />
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
                onClick={handleUpdateCity}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
    </>
  );
};

export default Addcity;
