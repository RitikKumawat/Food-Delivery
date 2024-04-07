import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import bg from './utils/bacground_theme.webp'
import { setToken } from "./utils/authSlice";
import { useDispatch } from "react-redux";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    try {
      //checking the login credentials
      const  response  = await axios.post("/api/v2/login", {
        email,
        password,
      });
      if(response.status===200){
        const token = response.data.token;
        console.log("TOKEN LOGIN ..",token);
        dispatch(setToken(token));
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        if (email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/");
        }
       
        toast.success("Login Successful");
        // Display success message
        
      }
      
    } catch (error) {
      console.log("ERROR LOGIN PAGE>>>",error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <img src={bg} alt="" className="w-screen h-screen absolute" />
      <form
        onSubmit={HandleLogin}
        className="h-auto  md:w-3/12 w-9/12 bg-black m-36 mt-20 mx-auto right-0 left-0 bg-opacity-75 rounded-xl absolute"
      >
        <h3 className="p-5 text-red-800 font-bold text-2xl md:text-xl cursor-pointer">
          Login
        </h3>
        <input
          type="email"
          placeholder="Enter your email..."
          className="mx-6 my-3 p-2 bg-slate-500 rounded-lg"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter your password..."
          className="mx-6 my-3 p-2 bg-slate-500 rounded-lg"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <button type="submit" className="mx-6 my-3 p-2 bg-blue-700 rounded-lg">
          Submit
        </button>
        <p className="p-4 text-green-700">
          {" "}
          Are you new,Let's{" "}
          <span className=" cursor-pointer" onClick={() => navigate("/register")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;