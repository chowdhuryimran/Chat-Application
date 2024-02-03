import Lottie from "lottie-react";
import LoginAnimation from "../../public/Animation/Login.json";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword,} from "firebase/auth";
import { userLoginInfo } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import Registration from "./Registration";

const Login = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  //  state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // state error

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  // Show and hide password
  const [showPassword, setShowPassword] = useState(false);

  // Loading
  const [loading, setLoading]=useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  // Email validation
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // password validation
  // Minimum eight characters, at least one letter, one number and one special character:
  const passwordregex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is Required");
    } 
    else if (!email.match(regex)) {
      setEmailError(" Please Correct Email");
    } 
    else if (!password) {
      setPasswordError("Password is Required");
    } 
    else if (!password.match(passwordregex)) {
      setPasswordError("Minimum eight characters, at least one letter, one number and one special character");
    } 
    else {
      setLoading(true);
       signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        const user = userCredential.user;
        dispatch (userLoginInfo(user));
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        setEmail("");
        setPassword("");
        toast.success('🦄Login SuccessFull!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          navigate("/home");
          
        
       })
       .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        // ..
      });

    }
  };

  return (
    
    <div className="bg-seven h-full">
      
      <div id="Login">
        <div className="left bg-eight w-full">
          <div className="flex justify-center items-center">
          <div>
            <h2 className="text-center text-4xl font-extrabold text-black font-Poppins">
              Login
            </h2>
            <p className="text-center font-bold text-black py-2 font-Poppins">
              It's quick and easy
            </p>
          </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-black font-semibold font-Poppins">
              Email:
            </label>
            <input
              onChange={handleEmail}
              type="text"
              name="email"
              className="mb-4"
            />
            <p className="text-red-500 font-Poppins font-light">{emailError}</p>
            <label className="text-black font-semibold font-Poppins ">
              Password:
            </label>
            <input onChange={handlePassword} type="password" name="password" />
            <p className="text-red-500 font-Poppins font-light">
              {passwordError}
            </p>
            {
               loading?
               <div className="flex justify-center">
                 <BeatLoader color="#36d7b7" />
               </div>
               :
               <button className="btn-v-1 font-Poppins font-semibold">
               Login
             </button>
            }
          
          </form>
          <p className="font-Poppins font-normal pt-2 text-center">
            <a href="" className="text-primary font-popins font-semibold">
              Forgotten password?
            </a>
            <p className="font-Poppins font-normal pt-2">Don't have a account?  <Link to="/Registration" className="text-primary font-popins font-semibold">Registration</Link></p>
          </p>
        </div>
        <div className="right">
          <Lottie animationData={LoginAnimation} />;
        </div>
      </div>
    </div>
  );
};

export default Login;
