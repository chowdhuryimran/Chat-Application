import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase,ref, onValue, remove, set, push,} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { activeChat } from "../slices/activeSlice";

const Friends = () => {
     const db = getDatabase();
     const data = useSelector((state) => state.userLoginInfo.userInfo);
    const dispatch = useDispatch();
     const [friendList, setFriendList]=useState([]);
     


    useEffect(()=>{
        const friendRef =ref(db, "friend")
        onValue(friendRef, (snapshot) => {
          let list = []
          snapshot.forEach((item)=>{
              if(data.uid==item.val().receiverId||data.uid==item.val().senderId){
                list.push({...item.val(), key:item.key})
              }
          })
          setFriendList(list)
                  
         })
    },[])
    // unfriend start
    const handleUnfriend=(item)=>{
           remove (ref(db, 'friend/'+ item.key))
    }

    // Block user
    const handleblock =(item)=>{
        if(data.uid==item.senderId){
              set(push(ref(db, 'block')),{
                block: item.receiverName,
                blockId: item.receiverId,
                blockBy: item.senderName,
                blockById: item.senderId
              }).then(()=>{
                remove (ref(db, 'friend/'+ item.key))
              })
        }else{
            set(push(ref(db, 'block')),{
                block: item.senderName,
                blockId: item.senderId,
                blockBy: item.receiverName,
                blockById: item.receiverId
              }).then(()=>{
                remove (ref(db, 'friend/'+ item.key))
              })
        }
    }

    // Msg Friend Active start
    const handleActiveFriend=(item)=>{
      if(item.receiverId==data.uid){
          dispatch(activeChat ({status: "single", id: item.senderId, name: item.senderName}))
          localStorage.setItem("activeFriend",JSON.stringify ({status: "single", id: item.senderId, name: item.senderName}))
      }
      else{
        dispatch(activeChat ({status: "single", id: item.receiverId, name: item.receiverName}))
        localStorage.setItem("activeFriend",JSON.stringify ({status: "single", id: item.receiverId, name: item.receiverName}))
      }
    }
    // Msg Friend Active end


    return (
        <div className="content-item">
        <div className="Title">
            <h2>Friends</h2>
            <BsThreeDotsVertical />
        </div>

        {
            friendList.map((item)=>{
                  return(
                    <div onClick={()=>handleActiveFriend(item)} key={item.key} className="user cursor-pointer">
             <div className="img-and-name">
                 <div className="img overflow-hidden">
                 <ProfilePicture id={data.uid==item.senderId?item.receiverId:item.senderId}></ProfilePicture>
                 </div>
                 <div>
                    <h2>{
                        data.uid==item.senderId?
                        <h3>{item.receiverName}</h3>
                        :
                        <h3>{item.senderName}</h3>
                        }</h2>
                    <p>Hiii...</p>
                 </div>
             </div>
             <div className="button">
             <button className="btn-v-4" onClick={()=>handleblock (item)}>Block</button>
                 <button className="btn-v-3" onClick={()=>handleUnfriend (item)}>UnFriend</button>
                 
                 
             </div>
        </div>
       
                  )
            })
        }
      
    </div>
    );
};

export default Friends;