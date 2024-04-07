import Item from "./Item";
import Shimmer from "./Shimmer";

import { useState, useEffect } from "react";
import { My_Swiggy_API } from "./constaints";
import {Swiggy_API} from "./constaints";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";


function Card() {
  
  const [listofRestraunt, setlistofRestraunt] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [filteredRestraunt, setfilteredRestraunt] = useState([]);
  const email  = localStorage.getItem('email')
  const[userEmail,setUserEmail] = useState(email);
  const {token} = useSelector((state)=>state.auth)
  const fetchData = async () => {
    const data = await fetch(My_Swiggy_API);
    const json = await data.json();
    var restaurant_data = null;
    if (json?.data?.cards[2]?.card?.card?.gridElements)
      restaurant_data =
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
    else
      restaurant_data =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

    setlistofRestraunt(restaurant_data);
    setfilteredRestraunt(restaurant_data);
  };

  useEffect(() => {
    fetchData();
  },[]);
  const[TopRated,setTopRated] = useState(false);
  
  if (listofRestraunt.length === 0) return <Shimmer />;
  if (!listofRestraunt) {
    return;
  }
  
  return (
    <div className="">
      <NavBar/>
      <h1 className=" p-2  md:mx-14 my-2 text-xl font-semibold font-serif">Welcome {userEmail}</h1>
      <div className="flex justify-between">
        <div>
          {
            TopRated ?
            (<button
            className="w-auto bg-green-700 text-white border border-e-4 rounded-lg p-2  md:mx-14 my-2 "
            onClick={()=>{
              setfilteredRestraunt(listofRestraunt)
              setTopRated(false);
            }}
            >
              All Restauraunts
            </button>):
            (<button
            className="w-auto bg-green-700 text-white border border-e-4 rounded-lg p-2  md:mx-14 my-2 "
            onClick={() => {
              const data = listofRestraunt.filter(
                (res) => res?.info?.avgRating > 4.5
              );
              setfilteredRestraunt(data);
              setTopRated(true);
            }}
          >
            Top Rated Restauraunt
          </button>)
          }
          
        </div>

        <div className="mr-12">
          <input
            type="text"
            placeholder="Type here.."
            className="md:w-60 md:24 w-44 ml-24 border border-b-4 p-1 rounded-lg  md:mr-2 "
            value={SearchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="text-white bg-red-700 p-1  rounded-lg my-2 border border-black ml-52 md:ml-0"
            onClick={() => {
              const search_data = listofRestraunt.filter((res) =>
                res.info.name.toLowerCase().includes(SearchText.toLowerCase())
              );
              setfilteredRestraunt(search_data);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap  md:ml-4">
        {filteredRestraunt.map((restaurant) => (
          <Link
            to={"/restraunt/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            <Item resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
