import Lottie from "lottie-react";
import registrationAnimation from "../../public/Animation/Registration.json";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  //  state
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // state error
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  // Show and hide password
  const [showPassword, setShowPassword] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  // Email validation
  const regex1 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // password validation
  // Minimum eight characters, at least one letter, one number and one special character:
  const passwordregex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setNameError("Full Name is Required");
    } else if (!email) {
      setEmailError("Email is Required");
    } else if (!email.match(regex1)) {
      setEmailError("Please Correct Email");
    } else if (!password) {
      setPasswordError("Password is Required");
    } else if (!password.match(passwordregex)) {
      setPasswordError(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
    } else if (!confirmPassword) {
      setConfirmPasswordError("Password is Required");
    } else if (!password.match(confirmPassword)) {
      setConfirmPasswordError("Password & ConfirmPassword Not Match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoading(true);
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "http://surl.li/ocmmz",
          })
            .then(() => {
              // Profile updated!
              const user = userCredential.user;
              console.log(user);
              setLoading(false);
              navigate("/");
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              toast.success('🦄Registration SuccessFull!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              // ...
            })
            .then(() => {
              set(ref(db, "users/" + auth.currentUser.uid), {
                username: auth.currentUser.displayName,
                email: auth.currentUser.email,
              });
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };

  return (
    <div className="bg-seven h-full ">
      <div
        id="registration"
        className="flex justify-between items-center flex-wrap px-2"
      >
        <div className="left  bg-eight w-full">
          <div>
            <h2 className="text-center text-4xl font-extrabold text-black font-Poppins">
              Sign Up
            </h2>
            <p className="text-center font-bold text-black py-2 font-Poppins">
              It's quick and easy
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-black font-semibold  font-Poppins">
              Full Name:
            </label>
            <input onChange={handleName} type="text" name="name" />
            <p className="text-red-500 font-Poppins font-light">{nameError}</p>
            <label className="text-black font-semibold font-Poppins">
              Email:
            </label>
            <input onChange={handleEmail} type="text" name="email" />
            <p className="text-red-500 font-Poppins font-light">{emailError}</p>
            <label className="text-black font-semibold font-Poppins">
              Password:
            </label>
            <input onChange={handlePassword} type="password" name="password" />
            <p className="text-red-500 font-Poppins font-light">
              {passwordError}
            </p>
            <label className="text-black font-semibold font-Poppins">
              Confirm Password:
            </label>
            <input
              onChange={handleConfirmPassword}
              type="Password"
              name="password"
            />
            <p className="text-red-500 font-Poppins font-light">
              {confirmPasswordError}
            </p>
            {loading ? (
              <div className="flex justify-center">
                <BeatLoader color="#36d7b7" />
              </div>
            ) : (
              <button className="btn-v-1 font-Poppins font-semibold">
                Sign Up
              </button>
            )}
          </form>
          <p className="font-Poppins font-normal pt-2">
            Already Have an Account?{" "}
            <Link to="/" className="text-primary font-popins font-semibold">
              Login
            </Link>
          </p>
        </div>
        <div className="right w-[50%]">
          <Lottie animationData={registrationAnimation} />;
        </div>
      </div>
    </div>
  );
};

export default Registration;
