import { apiconnector } from "./apiconnector";
import { clearItem } from "./userSlice";

export async function buyProduct(token,price,item,navigate,dispatch){
    try {
        const orderResponse = await apiconnector("POST","http://localhost:8000/api/v2/capturePayment",{price},{Authorization:`Bearer ${token}`,});
        if(!orderResponse.data.success){
            console.log("ORDER RESPONSE ERROR>>>>",orderResponse.data.message);
            throw new Error(orderResponse.data.message);
        }
        console.log("printing order response....",orderResponse);
        const options={
            key:'rzp_test_lMXcnSw5WYdtzR',
            currency:orderResponse.data.data.paymentResponse.currency,
            amount:`${orderResponse.data.data.paymentResponse.amount}`,
            order_id:orderResponse.data.data.paymentResponse.id,
            name:"Food Delivery",
            description:"Thanks for your purchase",
            handler: function(response){
                verifyPayment({...response,price,item},token,navigate,dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.log("PAYMENT API ERROR......",error);
        
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    try {
        const response= await apiconnector("POST","http://localhost:8000/api/v2/verifyPayment",bodyData,{Authorization:`Bearer ${token}`,})
        console.log("Verify payment response......",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("PRinting response verify payment",response);
        dispatch(clearItem());
        navigate("/")
    } catch (error) {
        console.log("Something wrong here",error);
        
    }
}