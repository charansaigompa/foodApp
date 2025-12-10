import { CDN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { removeItems } from "../utils/cartSlice";

const ItemCart = ({ items }) => {
  console.log(items);
  const dispatch=useDispatch();
  const handleRemoveItem=(item)=>{
   dispatch(removeItems(item))
  }

  return (
    <div>
      {items.map((item) => (
                               
        

        <div
          key={item.card.info.id}
          className="p-4 m-4 border-gray-300 border-b-2 text-left flex"
        >
           
          <div className="w-9/12">
            <div className="py-2 font-bold">
              <span>{item.card.info.name}</span>
              <span>
                {" "}
                - ₹{" "}
                {item.card.info.defaultPrice
                  ? item.card.info.defaultPrice / 100
                  : item.card.info.price / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 relative">
            <div>
              <button onClick={()=>handleRemoveItem(item)}
              className="absolute bg-black mx-16 text-white rounded-lg  shadow-lg p-1 transition duration-200 hover:scale-102">
                Remove
              </button>
            </div>

            <img
              className="w-50 rounded-xl"
              src={
                item.card.info.imageId.startsWith("http")
                  ? item.card.info.imageId
                  : CDN + item.card.info.imageId
              }
              alt=""
            />
          </div>
          
        </div>
      ))}

    </div>
  );
};
export default ItemCart;