import { getDatabase,ref, onValue, set, push,} from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";


const UserList = () => {
    
    const data = useSelector ((state)=>state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [usersList, setUsersList] = useState([]);
    const [friendList, setFriendList] = useState([]);
  
    const [friendRequestList, setFriendRequestList]=useState([]);

    const [blockList, setBlockList]=useState([]);

   
    // get all user from database
    useEffect (()=>{
        const userRef = ref(db, "users")
        onValue(userRef, (snapshot) => {
            let list = []
            snapshot.forEach((item)=>{

                if(data.uid != item.key){
                    list.push({...item.val(), id:item.key})
                }
            })
            setUsersList(list)
            
          });
    },[]);

    // handelFriendRequestsend
    const handelFriendRequestsend=(item)=>{
      set(push(ref(db, 'friendRequest')),{
        senderId: data.uid,
        receiverId: item.id,
        senderName: data.displayName,
        receiverName: item.username
      })
    
    }
// get all friend Request list
useEffect(()=>{
  const friendRequestRef =ref(db,'friendRequest')
  onValue(friendRequestRef, (snapshot) => {
    let friendRequest = []
    snapshot.forEach((item)=>{
        friendRequest.push(item.val().receiverId+item.val().senderId)
    });
    setFriendRequestList(friendRequest)
            
   });

},[])

// get friend list
useEffect(()=>{
    const friendListRef =ref(db,'friend')
  onValue(friendListRef, (snapshot) => {
    let friendList = []
    snapshot.forEach((item)=>{
        friendList.push(item.val().receiverId+item.val().senderId)
    });
    setFriendList(friendList)
            
   });
},[])

// get block button

useEffect(()=>{
    const blockListRef = ref(db, 'block')
    onValue(blockListRef, (snapshot)=>{
        let blockList = []
        snapshot.forEach((item)=>{
            blockList.push(item.val().blockId +item.val().blockById);
            
        });
        setBlockList(blockList)
    })
},[])





    return (
        <div className="content-item">
            <div className="Title">
                <h2>UserList</h2>
                <BsThreeDotsVertical />
            </div>

           {
            usersList.map((item,i)=>{
                
                 return(
                    <div key={i} className="user">
                    <div className="img-and-name">
                        <div className="img overflow-hidden">
                           <ProfilePicture id={item.id}></ProfilePicture>
                        </div>
                        <div>
                           <h2>{item.username}</h2>
                           <p>Hi...</p>
                        </div>
                    </div>
                    <div className="button">

                         {
                            
                            
                           
                        
                             friendRequestList.includes(data.uid + item.id)?
                             <button  className="btn-v-5">Accept</button>
                             :
                            friendList.includes(item.id + data.uid)||friendList.includes(data.uid+item.id)?
                            <button  className="btn-v-6">Friend</button>
                            :
                            friendRequestList.includes(item.id + data.uid)
                            ?
                            <button  className="btn-v-4">Request Sent</button>
                            :
                            blockList.includes(data.uid + item.id)
                            ?
                            <button className="btn-v-4">Block</button>
                             :
                             blockList.includes(item.id+data.uid)?
                             <button className="btn-v-4">UnBlock</button>
                             :
                            <button onClick={()=>handelFriendRequestsend(item)} className="btn-v-2">Add Friend</button>
                        } 
       
                       
                        
                    </div>
               </div>
               
                 )
                    
                 
            })
           }
        </div>
    );
};

export default UserList;