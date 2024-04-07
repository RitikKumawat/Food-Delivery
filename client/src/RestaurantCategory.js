import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="px-2 md:px-96">
      <div
        className="font-semibold text-xl w-11/12 h-auto m-2 cursor-pointer flex justify-between  border-b-8 pb-4 "
        onClick={() => setVisible(!visible)}
      >
        <span className="">
          {data?.title} ({data.itemCards?.length})
        </span>
        <span>⤵ </span>
      </div>

      {visible && <ItemList item={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
