import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Menu } from "../utils/constants";
import { useParams } from "react-router";
import { MenuItemImg } from "../utils/constants";
import useResMenu from "../utils/useResMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import ResShimmer from "./ResShimmer";

const RestaurantMenue = () => {
  const { resId } = useParams();
  const resInfo = useResMenu(resId);
  const[showIndex,setShowIndex]=useState(null)
   

  if (!resInfo) return <ResShimmer />; // loading state
  // console.log(resInfo?.cards[2]?.card?.card?.info.cuisines);

  const itemCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards;
  //console.log(itemCards);
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);
  const { text } = resInfo?.cards[0]?.card.card;

  if (!itemCards || itemCards.length === 0) {
    return <p>No menu items available.</p>;
  }

  return (
    <div className="text-center ">
      <h1 className="font-bold my-10 text-3xl">{text}</h1>
      {categories.map((category,index)=>(<RestaurantCategory key={category.card.card.categoryId} data={category?.card?.card}
      showItem={index===showIndex?true:false}
       setShowIndex={()=>  setShowIndex((prevIdx)=>prevIdx===index?null:index)}
      
      />))}
    </div>
  );
};
export default RestaurantMenue;

