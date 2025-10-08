import Card from "./Card";
import resList from "../utils/mockdata";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom"

const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.7149073&lng=83.3223223&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
     
  //   const json = await data.json();
  //   console.log(json);
  //   setListOfRes(
  //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  //   setFilteredRes(
  //     json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  // };
  const fetchData = async () => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.7149073&lng=83.3223223&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      { cache: "no-store" } // optional: forces fresh request
    );

    // If data not modified, use cached data
    if (response.status === 304) {
      console.log("Data not modified — using cached data");
      const cachedData = localStorage.getItem("restaurantsCache");
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setListOfRes(parsed);
        setFilteredRes(parsed);
      }
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    // Update state
    setListOfRes(restaurants);
    setFilteredRes(restaurants);

    // Cache the data for next time
    localStorage.setItem("restaurantsCache", JSON.stringify(restaurants));
  } catch (error) {
    console.error("Error fetching data:", error);

    // fallback to cached data if available
    const cachedData = localStorage.getItem("restaurantsCache");
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      setListOfRes(parsed);
      setFilteredRes(parsed);
    }
  }
};

  console.log("body rendered");
  //  if(listOfRes.length==0){
  //   return <Shimmer/>
  //  }
  const [searchText, setSearchText] = useState("");
  return listOfRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <button className="filter-btn"   onClick={()=>{
          setFilteredRes(listOfRes);
        }}>
          Back
        </button>
        <input
          type="text"
          className="searchbox"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            console.log(searchText);
            const updatedList = listOfRes.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setFilteredRes(updatedList);
          }}
        >
          search
        </button>

        <button
          className="filter-btn"
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
      <div className="card-container">
        {filteredRes.map((res) => (
          <Link key={res.info.id} to={"/restaurant/"+res.info.id} ><Card    resData={res} /></Link>
          
        ))}
      </div>
    </div>
  );
};
export default Body;


