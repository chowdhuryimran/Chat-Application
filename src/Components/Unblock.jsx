import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";


const Unblock = () => {

    const db = getDatabase();
    const data = useSelector((state) => state.userLoginInfo.userInfo);
    const [blockList, setBlockList]=useState([]);

    // block list from db
    useEffect(()=>{
        const blockListRef = ref(db, 'block')
        onValue(blockListRef, (snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(data.uid == item.val().blockById){
                    list.push({
                        id: item.key,
                        block: item.val().block,
                        blockId: item.val().blockId,
                    })
                    
                } 
             
                // else{
                //     list.push({
                //         id: item.key,
                //         blockBy: item.val().blockBy,
                //         blockById: item.val().blockById,
                //     })
                   
                // }
                setBlockList(list)
            })
        })
    },[])
    
    // unblock user

    const handleUnblock =(item)=>{
         set(push(ref(db, 'friend')),{
            senderName: item.block,
            senderId: item.blockId,
            receiverId: data.uid,
            receiverName: data.displayName
         }).then(()=>{
            remove (ref(db, 'block/'+ item.id))
         })
    }


    return (
        <div className="content-item">
        <div className="Title">
            <h2>Block User</h2>
            <BsThreeDotsVertical/>
        </div>

       {
        blockList.map((item)=>{
            return(
                <div key={item.id} className="user">
                <div className="img-and-name">
                    <div className="img overflow-hidden">
                        {
                            item.blockById?
                            <ProfilePicture id={item.blockById}></ProfilePicture>
                            :
                            <ProfilePicture id={item.blockId}></ProfilePicture>
                        }
                        
                    </div>
                    <div>
                       <h2>{item.block? item.block: item.blockBy}</h2>
                       <p>Block</p>
                    </div>
                </div>
                <div className="button">
                    {
                          item.blockById?
                          <button className="btn-v-4">Block</button>
                          :
                          <button className="btn-v-4"  onClick={()=>handleUnblock (item)}>UnBlock</button>
                    }
                
                
                    
                </div>
           </div>
        
            )
        })
       }
        
        
       
      
    </div>
    );
};

export default Unblock;