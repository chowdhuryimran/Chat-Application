import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";
const FriendRequest = () => {
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);
  const data = useSelector ((state)=>state.userLoginInfo.userInfo)
  

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if(item.val().receiverId== data.uid){
            list.push({...item.val(), id:item.key})
        }
      });
      setFriendRequestList(list);
    });
  }, []);

  // handelAcceptFriendRequest
  const handelAcceptFriendRequest=(item)=>{
         set(push(ref(db, "friend")),{...item})

         .then(()=>{
          remove(ref(db, "friendRequest/"+item.id))
         })
  }

  // handle cancel friend Request
  const handelCancelFriendRequest=(item)=>{
    remove(ref(db, "friendRequest/"+item.id))
  }

  return (
    <div className="content-item">
      <div className="Title">
        <h2>Friend Request</h2>
        <BsThreeDotsVertical />
      </div>

      {friendRequestList.map((item) => {
        return (
          <div key={item.id} className="user">
            <div className="img-and-name">
              <div className="img overflow-hidden">
                <ProfilePicture id={item.senderId}></ProfilePicture>
              </div>
              <div>
                <h2>{item.senderName}</h2>
                <p>Hiii...</p>
              </div>
            </div>
            <div className="button">
              <button onClick={()=>handelAcceptFriendRequest(item)} className="btn-v-5">Accept</button>
              <button onClick={()=>handelCancelFriendRequest(item)} className="btn-v-4">Cancel</button>

              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequest;
