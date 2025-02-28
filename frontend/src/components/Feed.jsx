import axios from "axios";
import { USER_URL } from "../utils/appStore/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/appStore/feedSlide";
import { useEffect } from "react";
import Card from "./Card";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(`${USER_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.feedUsers));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div>
        <Card user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
