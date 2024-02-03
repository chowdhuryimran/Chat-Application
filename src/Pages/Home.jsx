import { useSelector } from "react-redux";
import FriendRequest from "../Components/FriendRequest";
import Friends from "../Components/Friends";
import GroupList from "../Components/GroupList";
import Header from "../Components/Header";
import MyGroup from "../Components/MyGroup";
import Unblock from "../Components/Unblock";
import UserList from "../Components/UserList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MsgGroup from "../Components/MsgGroup";

const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header></Header>
      <div id="Home">
        <div className="items">
          <GroupList />
        </div>
        <div className="items">
          <Friends />
        </div>
        <div className="items">
          <UserList />
        </div>
        <div className="items">
          <FriendRequest />
        </div>
        <div className="items">
          <MyGroup />
        </div>
        <div className="items">
          <Unblock />
        </div>
        
      </div>
    </>
  );
};

export default Home;
