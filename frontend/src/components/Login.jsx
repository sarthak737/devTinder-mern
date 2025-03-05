import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/appStore/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/appStore/userSlice";
import { MdAddAPhoto } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [photo, setPhoto] = useState("");
  const [age, setAge] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log(email, password);

      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          email,
          firstName,
          photo,
          age,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center my-25">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <label className="input input-bordered input-primary flex items-center gap-2 mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          {!isLogin && (
            <>
              {" "}
              <label className="input input-bordered input-primary flex items-center gap-2 mt-5">
                <FaUser className="opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2 mt-5">
                <MdAddAPhoto className="opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Photo URL"
                  value={photo}
                  onChange={(e) => {
                    setPhoto(e.target.value);
                  }}
                />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2 mt-5">
                <CiCalendarDate className="opacity-70" />
                <input
                  type="number"
                  className="grow"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </label>
            </>
          )}
          <label className="input input-bordered input-primary flex items-center gap-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <div className="card-actions justify-center mt-2">
            {isLogin ? (
              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Login
              </button>
            ) : (
              <button
                className="btn btn-primary btn-block"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            )}
            <p className="text-red-600">{error}</p>
          </div>
          {isLogin && (
            <p
              onClick={() => setIsLogin(false)}
              className="cursor-pointer opacity-65 text-center"
            >
              New User? Sign Up
            </p>
          )}
          {!isLogin && (
            <p
              onClick={() => setIsLogin(true)}
              className="cursor-pointer opacity-65 text-center"
            >
              Existing User? Sign In
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
