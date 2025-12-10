import { logo } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("header rendered");
  const { loggedInUser } = useContext(UserContext);

  const online = useOnline();
  useEffect(() => {
    console.log("useEffect rendered in header");
  }, [btnName]);
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-between bg-amber-300 shadow-lg mb-4">
      <div className="w-30">
        <img className="logo" src={logo} alt="foodapp" />
      </div>

      <div className="flex items-center">
        <ul className="flex p-4 m-4 ">
          <li className="px-4 text-lg">Online:{online ? "✅" : "🔴"}</li>
          <li className="px-4 text-lg">
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </li>
          <li className="px-4 text-lg">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4 text-lg">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 text-lg">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 text-lg">
            <Link to="/cart">
              <div className="relative">
                <span className="text-2xl">🛒</span>

                {/* Badge */}
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              </div>
             
            </Link>
          </li>
          <li>
            <button
              className="login-btn text-lg"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
