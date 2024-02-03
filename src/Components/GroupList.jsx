import { getDatabase, onValue, push, ref,set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GroupList = () => {
    const [show, setShow]=useState(false);
    const [groupName, setGroupName]=useState("");
    const [groupIntro, setGroupIntro]=useState("");

    const db = getDatabase();

    const data = useSelector((state) => state.userLoginInfo.userInfo);

    const [groupList, setGroupList]=useState([]);
    
    
    

    const handlegroupName=(e)=>{
      setGroupName(e.target.value)
    }
    const handlegroupIntro=(e)=>{
      setGroupIntro(e.target.value)
    }
    // group create start
    const handleCreateGroup =()=>{
        set(push(ref(db, "group")),{
            groupName: groupName,
            groupintro: groupIntro,
            adminId: data.uid,
            adminName: data.displayName

        })
        .then(()=>{
            setShow(!show)
            setGroupName("")
            setGroupIntro("")
        })

    }
    // group create end

    //  get group from db start

    useEffect(()=>{

        const groupRef = ref(db, 'group')
        onValue(groupRef, (snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if( data.uid != item.val().adminId){
                 list.push({...item.val(), id:item.key})
            }

        });
        setGroupList(list)
    })
    },[])

    //  get group from db end

    // Join request start
    const handlejoinrequest=(item)=>{
        console.log(item)
        set(push(ref(db, "joingrouprequest")),{
            adminName: item.adminName,
            adminId: item.adminId,
            groupName: item.groupName,
            groupintro: item.groupintro,
            groupId: item.id,
            userId: data.uid,
            userName: data.displayName,
        }).then(()=>{
            toast.success('🦄Join Group!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    }
    // Join request end
    


    return (
        <div className="content-item">
            
        <div className="Title">
            <h2>GroupList</h2>
            {/* <BsThreeDotsVertical /> */}
            <>
            <button onClick={()=>setShow(!show)} className="btn-v-5">{show? "Cancel": "Create"}</button>
            </>
        </div>

        {
            show?
            <div className="bg-fifth p-5 rounded-md mt-3">
                <input onChange={handlegroupName} type="text" placeholder="Group Name" className="mb-3"></input>
                <input onChange={handlegroupIntro} type="text" placeholder="Group Intro" className="mb-1"></input>
                {
                    groupName && groupIntro?
                    <button onClick={handleCreateGroup} className="btn-v-5 w-full py-2">Create Group</button>
                    :
                    <button onClick={handleCreateGroup} className="btn-v-5 w-full py-2 opacity-[0.4] cursor-default">Create Group</button>

                }
                
            </div>
            :
            
            groupList.map(item=>{
              return(
                <div key={item.id} className="user">
                <div  className="img-and-name">
                    <div className="img overflow-hidden">
                        <ProfilePicture id={item.adminId}></ProfilePicture>
                    </div>
                    <div>
                        <h4 className="text-primary text-xl capitalize font-Oswald">Admin: {item.adminName}</h4>
                       <h2>{item.groupName}</h2>
                       <p>{item.groupintro}</p>
                    </div>
                </div>
                <div className="button">
                {

                    
                   
                    groupList.includes(data.uid+item.id || item.id+data.uid)?
                   <button className="btn-v-5">Request Send</button>
                   :
                   <button className="btn-v-5" onClick={()=>handlejoinrequest(item)}>Join</button>
                 
                }
                        
                    
                </div>
           </div>
              )
            })
            
        }

        
      
        
      
       
    </div>
    );
};

export default GroupList;