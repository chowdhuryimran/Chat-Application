
import { getDownloadURL,getStorage, ref} from "firebase/storage";
import { useEffect, useState } from "react";


const ProfilePicture = ({id}) => {

    const [profilePicture, setProfilePicture] = useState("");
    const storage = getStorage();
    const imgRef = ref(storage, id);


   useEffect(()=>{
    getDownloadURL(imgRef)
      .then((downloadURL) => {
        setProfilePicture(downloadURL);
      })
   },[id])



    return (
        <div>
           {
            profilePicture?
            <img src={profilePicture} alt="Profile"/>
            :
            <img src= "http://surl.li/ocmmz"/>
           }
            
        </div>
    );
};

export default ProfilePicture;