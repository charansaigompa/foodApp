
import Card, { withFastDelLabel } from "./Card";
import { useState, useEffect,useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const online = useOnline();
  const FastDelivery = withFastDelLabel(Card);
  const {loggedInUser,setUserName}=useContext(UserContext)
  useEffect(() => {
    // ✅ only fetch if user is online
    if (online) {
      fetchData();
    }
  }, [online]); // runs again when online changes

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error("Network response was not ok");
        
      }

      const json = await data.json();
      console.log(json.data);
      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle  ?.restaurants || [];
        // json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        //   ?.restaurants || [];

      setListOfRes(restaurants);
      setFilteredRes(restaurants);
    } catch (error) {
      console.warn("Fetch failed (handled safely):", error.message);
      // Prevent React Router from crashing
      setListOfRes([]);
      setFilteredRes([]);
    }
  };
  console.log(listOfRes)

  //console.log("Body rendered");

  // ✅ this part renders even if fetchData never ran
  if (!online) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <h1>You are offline — please check your internet connection!</h1>
      </div>
    );
  }

  if (listOfRes.length === 0) {
    return (
      <div className="body m-10 p-10">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="body m-10 p-10">
      <div className="flex justify-center">
        <button
          className="px-4 py-1 bg-amber-400 rounded-sm m-4"
          onClick={() => setFilteredRes(listOfRes)}
        >
          Back
        </button>

        <input
          type="text"
          className="border border-solid border-black m-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="bg-amber-400 px-4 py-1 m-4 rounded-sm"
          onClick={() => {
            const updatedList = listOfRes.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRes(updatedList);
          }}
        >
          Search
        </button>

        <button
          className="px-4 py-1 bg-amber-400 m-4 rounded-sm"
          onClick={() => {
            const filterList = listOfRes.filter(
              (res) => res.info.avgRatingString > 4.2
            );
            setFilteredRes(filterList);
          }}
        >
          Top Restaurants
        </button>
        
        
      </div>

      <div className="flex flex-wrap">
        {filteredRes.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
            {res.info.sla.deliveryTime < 25 ? (
              <FastDelivery resData={res} />
            ) : (
              <Card resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
