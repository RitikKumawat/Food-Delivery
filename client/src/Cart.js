import { useDispatch, useSelector } from "react-redux";
import gif from "./utils/icons8-shopping-cart.gif";
import { removeItem, clearItem } from "./utils/userSlice";
import { Swiggy_IMG_CNN } from "./constaints";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { buyProduct } from "./utils/paymentapi";
function Cart() {
  const item = useSelector((store) => store.cart.items);
  const {token} = useSelector((store)=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const handleClick = (id) => {
    console.log(id);
    dispatch(removeItem(id));
  };
  const handleRemoveAll = (items) => {
    dispatch(clearItem(items));
  };
  function getSum() {
    let sum = 0;
    for (let index = 0; index < item.length; index++) {
      if (item[index].card.info.price) sum = sum + item[index].card.info.price;
      else sum = sum + item[index].card.info.defaultPrice;
    }
    return sum / 100;
  }
  const handlePayment=(item)=>{
    console.log("ITEMs",item)
    buyProduct(token,getSum(),item,navigate,dispatch);

    return;

  }

  return (
    <>
    <NavBar/>
    <div>
      <h1 className="text-center text-4xl font-bold font-serif">Cart Items</h1>
      {item.length && (
        <button
          className="border border-black rounded-lg ml-[47.5%] text-white bg-black text-lg px-1"
          onClick={handleRemoveAll}
        >
          Clear All
        </button>
      )}
      
      <div className="px-8 md:px-96">
        {item.map((items,index) => (
          <div
            key={index}
            className=" border-b-4 flex justify-between mb-3"
          >
            <div className="p-3 w-2/3 ">
              <span className="font-semibold text-xl">
                {items.card.info.name} - ₹
                {items.card.info.defaultPrice &&
                  items.card.info.defaultPrice / 100}
                {!items.card.info.defaultPrice && items.card.info.price / 100}
              </span>
              <br />
              <p className="text-sm">{items.card.info.description}</p>
            </div>
            <div className="mr-14">
              <img
                className="md:w-36 w-28 h-28 rounded-lg absolute "
                src={Swiggy_IMG_CNN + items.card.info.imageId}
                alt=""
              />
              <button
                className="relative mb-20 md:ml-9 ml-7 text-white  w-auto  bg-black rounded-lg "
                onClick={() => handleClick(items.card.info.id)}
              >
                Remove{" "}
              </button>
            </div>
          </div>
        ))}
        {!item.length && (
          <div className="text-center">
            <img
              src={gif}
              alt="empty cart img"
              className="md:w-96 md:ml-36 mt-6 w-40 ml-20"
            />
            <h1 className="text-3xl font-semibold">Your cart is empty!</h1>
            <div className="flex flex-col gap-1">

              <Link to="/">
                <button className="bg-blue-500  text-white px-5 py-1 rounded-md font-serif hover:bg-blue-400 mt-2 ">
                  Shop Now
                </button>
              </Link>
              {
                token && (
                  <Link to={"/cart/recent-orders"} className=" bg-green-500  text-white px-5 py-1 rounded-md font-serif hover:bg-green-700 w-fit mx-auto">
                    Recent Orders
                  </Link>
                )
              }
              
            </div>
          </div>
        )}
        {item.length && (
          <div className="flex justify-between px-2">
            <h2 className="font-semibold">Subtotal - ₹{getSum()}</h2>
            <div className="flex flex-col gap-1">

            <button className="bg-yellow-500 text-black px-5 py-1 rounded-md font-serif hover:bg-yellow-400"
              onClick={()=>handlePayment(item)}
            >
              Place order
            </button>
            <Link to={"/cart/recent-orders"} className=" bg-green-500  text-white px-5 py-1 rounded-md font-serif hover:bg-green-700">
            Recent Orders
            </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Cart;
