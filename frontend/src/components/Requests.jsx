import axios from "axios";
import { USER_URL } from "../utils/appStore/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/appStore/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const req = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${USER_URL}/requests`, {
        withCredentials: true,
      });
      console.log(res.data.connectionReq);
      dispatch(addRequest(res.data.connectionReq));
    } catch (err) {
      console.log("Error getting req", err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!req) return;
  if (req.length == 0) return <h1>No request</h1>;

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img src={req[0].fromUserId.photoUrl} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{req[0].fromUserId.firstName}</h2>
          <p>{req[0].fromUserId.age}</p>
        </div>
      </div>
    </div>
  );
};
export default Requests;
