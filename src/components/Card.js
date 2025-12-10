import {CDN} from "../utils/constants"

const Card=(prop)=>{
    const {resData}=prop;
  return(
    <div className="m-4 p-2 w-[300px] rounded-2xl bg-amber-300  ">
       
      <img className="w-[300px] h-[250px] rounded-2xl" src= {CDN+resData.info.cloudinaryImageId} alt="resimg"/>

        <h2 className="font-bold text-lg py-2 ">{resData.info.name}</h2>
        <h4 className="truncate">{resData.info.cuisines.join(",")}</h4>
        <h4>{resData.info.avgRatingString} rating</h4>
        <h4>{resData.info.costForTwo} </h4>
        <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
    );
}

export const withFastDelLabel=()=>{
  return (props)=>{
    return (
      <div><label className="absolute bg-green-500 text-white p-1 rounded-lg">Fast Delivery</label>
      <Card {...props}/>
      </div>

    )
  }
}

export default Card;