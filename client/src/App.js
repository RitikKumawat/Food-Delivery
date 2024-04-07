
import Card from "./Card";
import { BrowserRouter, Outlet, Route, Routes, createBrowserRouter, useNavigate } from "react-router-dom";
import About from "./About";
import Error from "./Error";
import Contact from "./Contact";
import Cart from "./Cart";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import RecommendedRes from "./RecommendedRes";
import FoodGpt from "./FoodGpt";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Admin from "./Admin";
import { RecentOrders } from "./RecentOrders";
import { PrivateRoute } from "./PrivateRoute";
import NavBar from "./NavBar";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { clearToken } from "./utils/authSlice";
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  useEffect(()=>{
    const checkTokenExpiry=()=>{
      if(token){
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
            // Token is expired
          dispatch(clearToken());
          navigate("/login");
        }
    }
  };
  checkTokenExpiry();
},[dispatch, token])

  return (
    <div className="min-h-screen">
      
      <Routes>

      <Route path="/" element={<Card/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/gpt" element={<FoodGpt/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/restraunt/:resId" element={<RecommendedRes/>}/>
      <Route
        path="/cart/recent-orders"
        element={
          <PrivateRoute>
            <RecentOrders/>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}
// export const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Login />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },
//       {
//         path: "/card",
//         element: <PrivateRoute>
//         <Card/> </PrivateRoute>
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/Contact",
//         element: <Contact />,
//       },
//       {
//         path: "/Cart",
//         element: <Cart />,
//       },
//       {
//         path:"/gpt",
//         element:<FoodGpt/>
//       },
//       {
//         path:"/admin",
//         element:<Admin  />
//       },
//       {
//         path: "/restraunt/:resId",
//         element: <RecommendedRes />,
//       },
//       {
//         path:"/recent-orders",
//         element:<PrivateRoute>
//           <RecentOrders/>
//         </PrivateRoute>
//       }
      
//     ],
//     errorElement: <Error />,
//   },
// ]);

export default App;
