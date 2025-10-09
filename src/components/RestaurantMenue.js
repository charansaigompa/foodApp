import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Menu } from "../utils/constants";
import { useParams } from "react-router";
import { MenuItemImg } from "../utils/constants";
const RestaurantMenu = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

  const [resInfo, setResInfo] = useState(null);
  const { resData } = useParams();
  const fetchMenu = async () => {
    const data = await fetch(Menu + resData);
    const json = await data.json();
    console.log("menue data");
    console.log(json);
    setResInfo(json?.data);
  };
  if (resInfo === null) return <Shimmer />;

  // console.log(resInfo?.cards[2]?.card?.card?.info.cuisines);

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card?.itemCards;
  console.log(itemCards);

  console.log(itemCards);
  return (
    <div className="menu">
      <div className="menu-data">
        <h1 className="resName">{resInfo?.cards[2]?.card?.card?.info.name}</h1>
        <div className="menu-ftbox">
          <h2>
            {resInfo?.cards[2]?.card?.card?.info.cuisines.join(",")}-
            {resInfo?.cards[2]?.card?.card?.info.costForTwoMessage}
          </h2>
        </div>
        <ul>
          <div className="menu-items">
            {itemCards.map((item) => (
              <div key={item.card.info.name} className="menu-item-card">
                <div className="listData">
                  <li>
                    {item.card.info.name}- Rs
                    {item.card.info.price / 100 ||
                      item.card.info.finalPrice / 100}
                  </li>
                  <p>{item.card.info.description}</p>
                  <h3>
                    <span className="star">★</span>
                    {item.card.info.ratings.aggregatedRating.rating || 0}
                  </h3>
                </div>
                <div className="itemImgCont">
                  <img
                    className="itemImg"
                    src={MenuItemImg + item.card.info.imageId}
                    alt="itemimg"
                  />
                  <button className="filter-btn add">Add</button>{" "}
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default RestaurantMenu;
