import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";

export const recentOrders = async(token)=>{
    const toastId = toast.loading("Loading....");
    let result=[]
    try {
        const productResponse = await apiconnector("POST","http://localhost:8000/api/v2/recentOrders",{token})
        if(!productResponse){
            console.log("Order Response Error",productResponse.data.message);

        }
        result = productResponse;
        console.log("RECENT ORDERS RESPONSE",productResponse);
        console.log("RECENT ORDERS RESULT",result);
        
    } catch (error) {
        console.log("ERROr",error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}