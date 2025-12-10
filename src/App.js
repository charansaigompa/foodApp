import React,{lazy,Suspense,useState,useEffect} from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenue from "./components/RestaurantMenue";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";
import Cart from "./components/Cart"

const root = ReactDOM.createRoot(document.querySelector(".root"));
const Grocery=lazy(()=>import("./components/Grocery"))

const AppLayout = () => {
  const [userName,setUserName]=useState()
  useEffect(()=>{
    const data={
      name:"Ram krishna"
    }
    setUserName(data.name)
  },[])

  return(
  <div className="applay">
    <Provider store={appStore}>{//where ever you need to use store of redux you should wrap like this
    }
    <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
    <Header />
    <Outlet />
    </UserContext.Provider>
    </Provider>
  </div>
  )
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
      path:"/cart",
      element:<Cart/>
      },
      {
          path:"/restaurant/:resId",
          element:<RestaurantMenue/>
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/grocery",
        element:<Suspense  fallback={<h1>this is grocery component</h1>   }><Grocery/></Suspense>,
      },
    ],
    errorElement: <Error />,
  },
]);

root.render(<RouterProvider router={appRouter} />);
