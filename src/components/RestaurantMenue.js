import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Menu } from "../utils/constants";
import { useParams } from "react-router";
const RestaurantMenu = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

  const [resInfo, setResInfo] = useState(null);
  const {resData}=useParams()
  const fetchMenu = async () => {
    const data = await fetch(Menu+resData
    );
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
   
    <div className="menue">
      <h1>{resInfo?.cards[2]?.card?.card?.info.name}</h1>
      <h2>
        {resInfo?.cards[2]?.card?.card?.info.cuisines.join(",")}-
        {resInfo?.cards[2]?.card?.card?.info.costForTwoMessage}
      </h2>
      <ul>
       {itemCards.map((item)=>(<li  key={item.card.info.name}  >{item.card.info.name}-{item.card.info.price/100||item.card.info.finalPrice/100}</li>))}
        <li >{itemCards[0].card.info.name}</li>
        <li>{itemCards[1].card.info.name}</li>
        <li>Mutton biryani</li>
      </ul>
    </div>
    
  );
};
export default RestaurantMenu;
