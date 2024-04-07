import React from "react";
import { Swiggy_IMG_CNN } from "./constaints";

function Item(props) {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } =
    resData?.info;

  const { slaString } = resData.info.sla;
  return (
    <div className="p-2 my-3 md:h-fit h-80 bg-gray-200 rounded-lg shadow-xl cursor-pointer w-44 md:w-56 md:mx-8  ml-[8px] bigger:mx-3 bigger:ml-[19px]">
      <div className="relative">
        <img
          className="h-40  rounded-lg p-1 m-[0.2] w-44 md:w-60"
          src={Swiggy_IMG_CNN + cloudinaryImageId}
          alt=""
        />
      </div>
      <h2 className="font-semibold  ">{name}</h2>
      <div className="space-x-10 md:space-x-16">
        <span>{avgRating} 🌟 </span>
        <span>{slaString}</span>
      </div>
      <h2>{costForTwo}</h2>
      <p className="text-sm">{cuisines.slice(1, 5).join(", ")}</p>
    </div>
  );
}

export default Item;
