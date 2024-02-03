import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";

const Chatting = () => {
  const activeFrienddata = useSelector((state) => state.activeChatSlice);
 

  const [msg, setMsg]=useState("")
  const [msgList, setMsgList]=useState([])
  

  const db = getDatabase()
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const handleMsgText=(e)=>{
    setMsg(e.target.value)
    
  }


  const handleSendMsg=()=>{
    setMsg("");
    if(activeFrienddata.activeInfo.status=="single"){
        set(push(ref(db, "singleMsg")),{
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoReciveId: activeFrienddata.activeInfo.id,
            whoReciveName: activeFrienddata.activeInfo.name,
            message: msg,
            date: `
             ${new Date().getHours()%12||12}:${new Date().getMinutes()} ${new Date().getHours()>=12? "pm":"am"}`,
        }).then(()=>{
            console.log("send Msg")
        }).catch(()=>{
            console.log("Error") 
        })
    }else{
    console.log("Group")
  }
    
  }

//   get Message from Database

useEffect(()=>{
    onValue(ref(db, "singleMsg"),(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
           if(item.val().whoSendId==data.uid && item.val().whoReciveId==activeFrienddata.activeInfo.id ||item.val().whoReciveId==data.uid && item.val().whoSendId==activeFrienddata.activeInfo.id){
              list.push(item.val())
           }
        });
        setMsgList(list)
                
    });
    
},[activeFrienddata.activeInfo.id])
  

  return (
    <div className="px-[30px] relative">
      <div className="py-2 sticky w-full z-[33] bg-blue-700 left-0 top-0">
        <div className="flex gap-2 items-center shadow-lg p-2 rounded-lg">
          <div className="w-[80px] h-[80px] bg-black rounded-full">
            
          </div>
          <h2 className=" text-lg font-bold text-black">
            {activeFrienddata?.activeInfo.name}
          </h2>
        </div>
      </div>

      <div className="h-[700px] overflow-y-scroll px-2 py-3">
          

          {
            activeFrienddata.activeInfo.status=="single"?
            msgList.map((item)=>{
                return(
                    item.whoSendId==data.uid?
                    <div className="text-right">
                    <div className="px-2 py-1 bg-blue-700 inline-block ">
                      <p className="text-white">{item.message}</p>
                    </div>
                    <p>{item.date}</p>
                  </div>
                    :

                  
                  <div className="text-left">
                  <div className="px-2 py-1 bg-gray-200 inline-block">
                     <p>{item.message}</p>
                  </div>
                  <p>{item.date}</p>
              </div>

                )
            })
            :
            <p>Group</p>
          }

      
        </div>

      <div className=" py-8 sticky w-full z-[33] left-0 bottom-0">
        <div className="flex justify-between gap-2 items-center">
          <div className="w-full rounded-lg">
            <input onChange={ handleMsgText} type="text" placeholder="Enter Your Message" value={msg}></input>
          </div>
          <div className="">
            <button onClick={handleSendMsg} className="btn-v-2 py-3 px-3">Send</button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Chatting;
