import { useState } from "react";
import { MdInsertPhoto } from "react-icons/md";
import Card from "./Card";
import axios from "axios";
import { PROFILE_URL } from "../utils/appStore/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appStore/userSlice";
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [password, setPassword] = useState(user.password);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);
  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/profile/edit`,
        { firstName, password, photoUrl },
        { withCredentials: true }
      );
      console.log("Updated", res.data);
      dispatch(addUser(res?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    } catch (err) {
      console.log("Error update ", err);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center my-25">
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <label className="input input-bordered input-primary flex items-center gap-2 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered input-primary flex items-center gap-2 mt-2">
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
            <label className="input input-bordered input-primary flex items-center gap-2 mt-2">
              <MdInsertPhoto />
              <input
                type="text"
                className="grow"
                placeholder="Profile URL"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                }}
              />
            </label>
            <div className="card-actions justify-center mt-2">
              <button
                className="btn btn-primary btn-block"
                onClick={handleEdit}
              >
                Edit
              </button>
              <p className="text-red-600"></p>
            </div>
          </div>
        </div>
      </div>
      <Card user={user} />
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile edited successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
