import axios from "axios";
import { REQ_URL, USER_URL } from "../utils/appStore/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/appStore/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const req = useSelector((store) => store.request);

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        `${REQ_URL}/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log("error", err);
    }
  };
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
      {req.map((r) => (
        <div key={r._id} className="card card-side bg-base-100 shadow-sm">
          <figure>
            <img src={r.fromUserId.photoUrl} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{r.fromUserId.firstName}</h2>
            <p>{r.fromUserId.age}</p>
            <button
              className="btn btn-secondary"
              onClick={() => reviewRequests("accepted", r._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-primary"
              onClick={() => reviewRequests("rejected", r._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Requests;
