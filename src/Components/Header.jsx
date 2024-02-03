import { FaHome } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import { createRef, useState } from "react";
import { getDownloadURL,getStorage,ref,uploadString,} from "firebase/storage";

// react cropper start
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
// react cropper end

import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";

const Header = () => {
  const storage = getStorage();

  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const cropperRef = createRef();

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch (userLoginInfo(null));
        localStorage.removeItem("user")
        navigate("/");
      })
      .catch((error) => {});
  };

  const handelCloseModel = () => {
    setModal(false);
    setImage(null);
    // setCropData(null)
  };

  const handelProfileUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      // console.log(reader.result)
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, auth.currentUser.uid);

      // Data URL string
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });
          dispatch(userLoginInfo({ ...data, photoURL: downloadURL }));
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          setModal(false);
        });
      });
    }
  };

  return (
    <>
      {/* img upload start */}

      {modal && (
        <div className="imageUploadModal">
          <div className="imageUploadModalcontainer">
            <h1>Upload Your Profile Picture</h1>

            {image ? (
              <div className="h-32 w-32 mx-auto bg-black rounded-full overflow-hidden mt-4">
                <div className="img-preview w-full h-full"></div>
              </div>
            ) : (
              <div className="h-32 w-32 mx-auto bg-black rounded-full overflow-hidden mt-4">
                <img src={data?.photoURL}></img>
              </div>
            )}

            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            )}

            <div className="flex justify-center pt-4">
              <input
                onChange={handelProfileUpload}
                type="file"
                className="w-[250px]"
              ></input>
            </div>
            <div className="flex mx-auto w-[250px] gap-6">
              <button onClick={getCropData} className="btn-v-1">
                Upload
              </button>
              <button onClick={handelCloseModel} className="btn-v-6 ">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* img upload end  */}

      <div id="Header">
        <div className="container mx-auto">
          <div className="flex gap-3 md:gap-5 text-white text-xl md:text-3xl">
            
            <Link to='/Home'>
            <FaHome />
            </Link>
            <Link to='/chat'>
            <IoChatbubbleEllipsesSharp />
            </Link>
            <div onClick={handelLogout} className="cursor-pointer">
              <GrLogout />
            </div>
          </div>
          <div className="profile-Name">
            <div className="">
              <h2 className="text-bold uppercase text-xl md:text-xl">{data.displayName}</h2>
            </div>
            <div className="Profile-Picture">
              <div onClick={() => setModal(true)} className="Profile-upload">
                <MdCloudUpload />
              </div>
              <img src={data?.photoURL}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
