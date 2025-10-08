import {CDN} from "../utils/constants"

const Card=(prop)=>{
    const {resData}=prop;
  return(
    <div className="card link">
       
      <img className="res-img" src= {CDN+resData.info.cloudinaryImageId} alt="resimg"/>

        <h1>{resData.info.name}</h1>
        <h4>{resData.info.cuisines.join(",")}</h4>
        <h4>{resData.info.avgRatingString} rating</h4>
        <h4>{resData.info.costForTwo} </h4>
        <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>
    );
}
export default Card;