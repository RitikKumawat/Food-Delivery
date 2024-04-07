import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/userSlice";
import { Swiggy_IMG_CNN } from "./constaints";
import toast from "react-hot-toast";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = (items) => {
    try {
      
      dispatch(addItem(items));
    } catch (error) {
      toast.error("Error Adding Items...")
    }
    toast.success("Item Added");
  };

  return (
    <div className="mb-2">
      {item.map((items) => (
        <div
          key={items.card.info.id}
          className=" border-b-4 flex justify-between mb-2 mr-10 md:mr-0"
        >
          <div className="p-3 w-2/3">
            <span className="font-semibold text-xl">
              {items.card.info.name} - ₹
              {items.card.info.price && items.card.info.price / 100}
              {!items.card.info.price && items.card.info.defaultPrice / 100}
            </span>
            <br />
            <p className="text-sm">{items.card.info.description}</p>
          </div>
          <div>
            <img
              className="w-36 rounded-lg absolute h-28 transition-all duration-300 "
              src={Swiggy_IMG_CNN + items.card.info.imageId}
              alt=""
            />
            <button
              className="relative mb-20 ml-9 text-white w-auto  rounded-lg backdrop-blur-lg p-1 hover:scale-105 transition-all duration-75 "
              onClick={() => handleClick(items)}
            >
              Add Item{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
