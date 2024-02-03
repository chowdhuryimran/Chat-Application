import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";


const MsgGroup = () => {

    const db = getDatabase();
    const data = useSelector((state) => state.userLoginInfo.userInfo);

    const [GroupListMsg, setGroupListMsg]=useState([]);

    useEffect(()=>{
        const groupMsgRef =ref(db, "group")
        onValue(groupMsgRef, (snapshot) => {
          let list = []
          snapshot.forEach((item)=>{
            list.push({...item.val(), id:item.key})
          })
          setGroupListMsg(list)
                  
         })

    },[])


    return (
      <div>
            <div className="content-item">
        <div className="Title">
            <h2>Group List</h2>
            <BsThreeDotsVertical />
        </div>

        {
            GroupListMsg.map((item)=>{
                  return(
                    <div key={item.key} className="user">
             <div className="img-and-name">
                 <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-black">
                     <h2 className="text-2xl text-green-600">{item.groupName[0]}</h2>
                 </div>
                 <div>
                    <p>Admin:{item.adminName}</p>
                    <p>{item.groupName}</p>
                    <p>{item.groupintro}</p>
                 </div>
             </div>
             <div className="button">
             <button className="btn-v-2">Message</button>
             </div>
          </div>
       
                  )
            })
        }
      
    </div>
      </div>
    );
};

export default MsgGroup;