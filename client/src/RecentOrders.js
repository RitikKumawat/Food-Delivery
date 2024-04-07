import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { recentOrders } from './utils/recentOrderApi'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Swiggy_IMG_CNN } from './constaints'
import { buyProduct } from './utils/paymentapi'
import { useNavigate } from 'react-router-dom'

export const RecentOrders = () => {
  const {token} = useSelector((state)=>state.auth);
  const [recentOrderData,setRecentOrderData] = useState([]);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchRecentOrders = async()=>{
    try {
      setLoading(true);
      console.log("TOKEN",token);
      const Response = await recentOrders(token);
      // const res = await Response.json();
      const res = await Response?.data?.data;
      console.log("RESPONSE>>>>>",res)
      if(res){
        
        setRecentOrderData(res);
      }
      console.log("REcenet order data",recentOrderData);
      toast.success("Recent Orders");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }
  function dateFormater(createdAt){
    const dateObject = new Date(createdAt);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      
  };
  const formattedDate = dateObject.toLocaleString('en-US', options);
  return formattedDate;
  }
  const handleBuy=(item)=>{
    console.log("ITEMs",item)
    buyProduct(token,item.price,item,navigate,dispatch);

    return;

  }
  
  useEffect(()=>{
    
     fetchRecentOrders();
  },[])
  
  return (
    <div className='min-h-screen'>
        <NavBar/>
        <div>
          <h1 className='text-3xl w-fit mx-auto'>Track Your Recent Orders</h1>

          <div className='mt-5'>
            {
              recentOrderData ?( recentOrderData.map((item)=>(
                <div className='flex flex-col mx-auto w-[460px]  p-4 mb-3 gap-3 border border-gray-300 hover:border-gray-400 hover:scale-105 transition-all duration-150 '>
                  <p className=' font-medium text-xl'>Ordered on-{dateFormater(item.createdAt)}</p>
                    <div className='flex flex-col gap-2'>
                  {

                    item.products.map((product)=>(
                      <div className='flex gap-4 items-center'>
                        <img className="md:w-[30%] w-28 h-28 rounded-lg " 
                        src={`${Swiggy_IMG_CNN}`+product.imageId}/>
                        <div className='flex flex-col w-[70%]'>
                          <p className='font-semibold'>{`${product.name}`}</p>
                          <p className='text-sm'>{`${product.description}`}</p>
                          <p className='font-semibold'>Price- ₹{`${product.defaultPrice}`}</p>
                        </div>
                      </div>
                    ))
                  }
                    </div>
                    <p className='w-fit mx-auto'>Total Price: <span className='font-bold'>₹{`${item.price}`}</span></p>
                    <button className=" bg-green-500  text-white px-5 py-1 rounded-md font-serif hover:bg-green-700 w-fit mx-auto"
                    onClick={()=>handleBuy(item)}>
                      BuyAgain
                    </button>
                </div>
              ))
              ):(
                <h1 className='font-bold text-3xl text-center'>No recent orders</h1>
              )
            }
          </div>
        </div>
    </div>
  )
}
