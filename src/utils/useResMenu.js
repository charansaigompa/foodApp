import { useState ,useEffect} from "react"
import { Menu } from "./constants"



const useResMenu=(resId)=>{

   const [resData,setResData]=useState(null)
   useEffect(()=>{
   fetchMenu();
   },[])
   const fetchMenu=async ()=>{
    const data=await fetch(Menu+resId)
    const json=await data.json();
    setResData(json.data)

   }
    return resData
}
export default useResMenu