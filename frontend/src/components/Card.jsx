import { useDispatch } from "react-redux";
import { REQ_URL } from "../utils/appStore/constants";
import { removeFeed } from "../utils/appStore/feedSlide";
import axios from "axios";

const Card = ({ user }) => {
  if (!user) return;
  const dispatch = useDispatch();
  const requestHandle = async (status, _id) => {
    try {
      const res = await axios.post(
        `${REQ_URL}/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log("Error send ", err);
    }
  };
  return (
    <div>
      <div className="card bg-ghost-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={user.photoUrl} alt="user" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName}</h2>
          <p>Age: {user.age}</p>
          <div className="card-actions">
            <button
              className="btn btn-secondary"
              onClick={() => requestHandle("interested", user._id)}
            >
              Send req
            </button>
            <button
              className="btn btn-primary"
              onClick={() => requestHandle("ignored", user._id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
