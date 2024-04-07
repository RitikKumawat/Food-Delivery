import { useState, useEffect } from "react";

import RestaurantCategory from "./RestaurantCategory";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
function RecommendedRes() {
  const { resId } = useParams();

  const [Recommended, setRecommended] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const MenuData = await fetch(
      "https://server-foodhunt.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=" +
        resId
    );

    const json = await MenuData.json();
    // console.log("Recommende Res...",json)
    setRecommended(json.data);
  };
  if (Recommended === null) return;

  var category = null;
  const temp = Recommended?.cards.filter(
    (x) => x.groupedCard?.cardGroupMap?.REGULAR
  );
  // console.log("TEMP",temp);
  category = temp[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  // console.log("Category",category);

  const temp2 = Recommended?.cards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  // console.log("Temp2",temp2);

  const { name, cuisines } = temp2[0].card?.card?.info;

  return (
    <div>
      <NavBar/>
      <div className="text-center">
        <h1 className="font-bold text-3xl">{name}</h1>
        <i>{cuisines.join(",")}</i>
        <br />
        <br />
        {category &&
          category.map((item) => (
            <RestaurantCategory
              key={item?.card?.card?.title}
              data={item?.card?.card}
            />
          ))}
      </div>
    </div>
  );
}

export default RecommendedRes;
