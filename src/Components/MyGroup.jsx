import { BsThreeDotsVertical, BsTypeH1 } from "react-icons/bs";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";


const MyGroup = () => {


    const db = getDatabase();
    const [myGroupList,setMyGroupList]=useState([]);

    const data = useSelector((state) => state.userLoginInfo.userInfo);
    const [show, setShow] = useState(false)
    const [showGroupMember, setShowGroupMember] = useState(false)
    const [groupJoinRequest, setGroupJoinRequest] = useState([])
    const [groupMembersList, setGroupMembersList] = useState([])

   useEffect(()=>{

    const mygroupRef = ref(db, 'group')
    onValue(mygroupRef, (snapshot)=>{
    let list = []
    snapshot.forEach((item)=>{
       if(data.uid== item.val().adminId){
        list.push({...item.val(), id:item.key})
       }

    });
    setMyGroupList(list)
   })

   },[])


//    groupInfo start

const handleGroupInfo=(itemInfo)=>{
    setShowGroupMember(!showGroupMember)
    
    const groupMemberRef = ref(db, 'groupMembers')
    onValue(groupMemberRef, (snapshot)=>{
    let list = []
    snapshot.forEach((item)=>{
      if(data.uid==itemInfo.adminId && item.val().groupId==itemInfo.id){
        list.push({...item.val(), key:item.key})
      }

    });
    setGroupMembersList(list)
   })
   console.log(groupMembersList)
}
//    groupInfo end


// get group join request from database start
const handleGroupRequest=(group)=>{
    setShow(!show)
    console.log(group)

    const groupRequestRef = ref(db, 'joingrouprequest')
    onValue(groupRequestRef, (snapshot)=>{
    let list = []
    snapshot.forEach((item)=>{
       if(data.uid== item.val().adminId && item.val().groupId== group.id){
        list.push({...item.val(), key:item.key})
       }

    });
    setGroupJoinRequest(list)
    
    
   })

   
}

// get group join request from database  end


// Group Request Accept start
        const handleGroupRequestAccept=(item)=>{
            set(push(ref(db, 'groupMembers')),{
               groupId: item.groupId,
               groupName: item.groupName,
               adminId: item.adminId,
               adminName: item.adminName,
               userId: item.userId,
               userName:item.userName,

                
            })
            .then(()=>{
                remove(ref(db, 'joingrouprequest/'+ item.key ))
            })
        }
// Group Request Accept end



    return (
        <div className="content-item">
        <div className="Title">
            <h2>{myGroupList.length<=1? "My Group" : "My Groups"}</h2>
            <div>
                {
                    showGroupMember? <button className="btn-v-5" onClick={()=>setShowGroupMember(!showGroupMember)}>Back</button>
                    :
                    show?<button className="btn-v-5" onClick={()=>setShow(!show)}>Back</button>
                    :
                    <BsThreeDotsVertical/>
                }
            
            </div>
            
        </div>
        {
            myGroupList.length<=0?
            <h2 className="text-center font-Oswald text-xl text-four"> No Group </h2>
            :
             showGroupMember?
             <>
             <h2>Group Info</h2>
             
             {
                groupMembersList.length<=0?
                <h2 className="text-center font-Oswald text-xl text-four"> No Members </h2>
                :
               groupMembersList.map((item)=>{
                  return(
                    <div key={item.id} className="user">
                    <div className="img-and-name">
                        <div className="img overflow-hidden">
                            <ProfilePicture id={item.userId}></ProfilePicture>
                        </div>
                        <div>
                        {/* <h4 className="text-primary text-xl font-Oswald">Admin: {item.adminName}</h4> */}
                           <h2></h2>
                           <p>{item.userName}</p>
                        </div>
                    </div>
                    
                 </div>
                  )
               })

             }
             </>
             
             :
            show?
            <div>
                <h2 className="font-Oswald">Request</h2>
               {
                  groupJoinRequest.length<=0?
                  <h1 className=" flex justify-center text-red-600 font-Oswald">No Group</h1>
                  :
                  groupJoinRequest.map((item)=>{
                    return(
                     <div key={item.id} className="user">
                     <div className="img-and-name">
                         <div className="img overflow-hidden">
                             <ProfilePicture id={item.userId}></ProfilePicture>
                         </div>
                         <div>
                         {/* <h4 className="text-primary text-xl font-Oswald">Admin: {item.adminName}</h4> */}
                            <h2></h2>
                            <p>{item.userName}</p>
                         </div>
                     </div>
                     <div className="button">
                     
                     <button className="btn-v-5" onClick={()=>handleGroupRequestAccept(item)} >Accept</button>
                     <button className="btn-v-2">Cancel</button>
                         
                     </div>
                </div>
                    )
                 })

               }
            </div>

            :
            myGroupList.map((item)=>{
                return(
                    <div key={item.id} className="user">
                    <div className="img-and-name">
                        <div className="img overflow-hidden">
                            <ProfilePicture id={item.adminId}></ProfilePicture>
                        </div>
                        <div>
                        {/* <h4 className="text-primary text-xl font-Oswald">Admin: {item.adminName}</h4> */}
                           <h2>{item.groupName}</h2>
                           <p>{item.groupintro}</p>
                        </div>
                    </div>
                    <div className="button">
                    
                    <button className="btn-v-5" onClick={()=>handleGroupInfo(item)}>info</button>
                    <button className="btn-v-2"onClick={()=>handleGroupRequest(item)}>Request</button>
                        
                    </div>
               </div>
                )
            })
        }

      
      
        
       
      
    </div>
    );
};

export default MyGroup;