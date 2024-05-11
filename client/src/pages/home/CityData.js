import CityCard from "../../components/CityCard";
import { useHotelContext } from "../../store/HotelDetails";
import { NavLink } from "react-router-dom";

const HotelData = () => {
  const { cityList } = useHotelContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          overFlow: "hidden",
        }}
      >
        <div
          style={{
            width: "70%",
            textAlign: "center",
            margin: "2rem auto",
          }}
        >
          <h1>Popular locations in India </h1>
          <p>
            From swanky upscale restaurants to the cosiest hidden gems serving
            the most incredible food, Zomato covers it all. Explore menus, and
            millions of restaurant photos and reviews from users just like you,
            to find your next great meal.
          </p>
        </div>
        <div
          style={{
            width: "80%",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            rowGap: "2.4rem",
            flexWrap: "wrap",
            margin: "2rem auto",
          }}
        >
          {cityList &&
            cityList.map((name) => {
              return (
                <>
                  <NavLink
                    to={`/hotelsincity/${name.id}`}
                    style={{ color: "black" }}
                  >
                    <CityCard key={name.id} cityId={name.id}>
                      <p>{name.city_name}</p>
                    </CityCard>
                  </NavLink>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default HotelData;
