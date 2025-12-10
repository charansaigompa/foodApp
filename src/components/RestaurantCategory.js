 
import ItemCategory from "./ItemCategory";
import { useState } from "react";

const RestaurantCategory = ({ data ,showItem,setShowIndex}) => {
  
  const handleClick=()=>{
    setShowIndex()
  }
  console.log(data)
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 shadow-lg p-4 bg-gray-100 rounded-s cursor-pointer ">
        <div className="flex justify-between cursor-pointer"
        onClick={handleClick}
        >
          
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>▼</span>
        </div>
        {showItem&&<ItemCategory  items={data.itemCards}/>}
        

      </div>
    </div>
  );
};
export default RestaurantCategory;