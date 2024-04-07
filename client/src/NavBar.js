import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGO } from "./constaints";
const NavBar = () => {
  const item = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.setItem("email", "");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    // location.reload();
    setIsLoggedIn(false);
    navigate("/");
  };
  const {token} = useSelector((state)=>state.auth);
  const[isLoggedIn,setIsLoggedIn] = useState(token?true:false);

  const handleAlert = () => {
    if (window.confirm("Are you sure you want to sign-out!")) {
      var txt = "You pressed OK!";
      window.location.reload();
      handleSignOut();
    } else {
      var txt = "You pressed Cancel!";
    }
  };

  return (
    <div className="flex justify-between border-b-4 items-center">
      <img className="h-16 md:h-20" src={LOGO} alt="#" />
      <div className="flex list-none font-bold text-xs">
        <Link
          to="/"
          className="mx-3 text-[13px] md:text-[20px] md:mx-4  py-2  "
        >
          Home
        </Link>
        <Link
          to="/about"
          className=" mx-3 text-[13px] md:text-[20px] md:mx-4 py-2 "
        >
          About Us
        </Link>
        <Link
          className="mx-3 text-[13px] md:text-[20px] md:mx-4 py-2 "
          to="/contact"
        >
          Contact Us
        </Link>
        <Link
          className="mx-3 text-[13px] md:text-[20px] md:mx-4 py-2  "
          to="/gpt"
        >
          GPT
        </Link>
        <Link
          className=" mx-3 text-[13px]  md:text-[20px] md:mx-4 py-2  "
          to="/cart"
        >
          Cart ({item.length})
        </Link>
        {
          token && isLoggedIn ? (
            <button
            onClick={() => {
            handleAlert();
            }}
            className="px-2 md:text-[15px] mx-3 shadow-sm bg-red-700 text-white rounded-lg py-2  cursor-pointer"
            >
            Sign Out
            </button>
          ):(
            <Link to={"/login"} className="px-2 md:text-[15px] mx-3 shadow-sm bg-green-700 text-white rounded-lg py-2 cursor-pointer"
            >
              Login
            </Link>
          )
        }
        
      </div>
    </div>
  );
};

export default NavBar;
