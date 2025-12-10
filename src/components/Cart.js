import { useSelector } from "react-redux";
import ItemCategory from "./ItemCategory";
import { clearCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import ItemCart from "./ItemCart";
const Cart=()=>{
    const cartItems=useSelector((store)=>store.cart.items)
    const dispatch=useDispatch()
    const handleClearCart=()=>{
        dispatch(clearCart());
    }
    const totalPrice = cartItems.reduce((total, item) => {
  const price = item.card.info.defaultPrice
    ? item.card.info.defaultPrice / 100
    : item.card.info.price / 100;

  return total + price;
}, 0);

return(
    <div className="text-center m-5 p-5">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6/12 m-auto bg-amber-300 p-5 rounded-xl"> 
        <button className="p-2 m-2 bg-black rounded-lg text-white transition duration-200 hover:scale-102" onClick={handleClearCart}>Clear Cart</button>
        {cartItems.length===0&&<h1>Cart is empty.Add items to cart</h1>}
        <div className="w-11/12 bg-amber-50 m-auto rounded-lg"><ItemCart items={cartItems}></ItemCart></div>
        </div>
       { cartItems.length>0&&<div className="w-6/12 m-auto mt-10 bg-amber-300 p-5 rounded-xl">
            <h1 className="text-#333333 text-lg font-bold">Total Amount: ₹{totalPrice} /-</h1>
        </div>}
       { cartItems.length>0&&<button className="p-2 m-2 bg-black rounded-lg text-white transition duration-200 hover:scale-102">
            Payment
        </button>}
    </div>
)
}
export default Cart;