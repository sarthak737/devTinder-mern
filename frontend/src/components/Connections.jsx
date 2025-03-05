import axios from "axios";
import { USER_URL } from "../utils/appStore/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/appStore/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(`${USER_URL}/connections`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log("Error ", err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection) return;

  if (connection.length == 0) {
    return;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10">Connections</h1>
      {connection.map((el) => {
        return (
          <div
            key={el._id}
            className="card card-side bg-base-300 shadow-xl m-5"
          >
            {/* <figure>
              <img src={el.photoUrl} alt="Movie" />
            </figure> */}
            <div className="card-body">
              <h2 className="card-title">{el.firstName}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
