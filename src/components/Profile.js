import { useState, useRef,useEffect,useContext } from "react";
import Header from "./Header";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { AiOutlineCamera } from "react-icons/all";
import GlobalContext from '../context/GlobalContext';

export default function Profile() {

  const history = useHistory()
  const profileImg = useRef();

  const {handleProfileImg,handleUser,user: profileUser} = useContext(GlobalContext);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // let profileUser = user;
  const initialUserState = {
    name: profileUser.name,
    email: profileUser.email,
    password: profileUser.password,
    img: profileUser.img
  }
  if (!profileUser) {
    localStorage.clear();
  }
  const [user, setUser] = useState({
    name: profileUser.name,
    email: profileUser.email,
    password: profileUser.password,
  });
  const [userImg, setUserImg] = useState(null);
  const [userImage, setUserImage] = useState(profileUser.img);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = function (evt) {
      profileImg.current.src = evt.target.result;
      setUserImg(evt.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const getProfile = () => {
    axios.get("/profile/" + profileUser._id).then((res) => {
      if(res.data.success) {
        handleUser(res.data.data);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
      } else {
        localStorage.clear();
        history.push('/sign-in');
        console.log(res.data.message)
      }
    })
  };

  useEffect(() => {
    handleProfileImg(userImage)
    setInterval(() => {
      getProfile();
    }, 120000)
  },[]);
  
  const submitHandle = () => {

    const data = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      img: profileImg.current.src
    }

    axios
      .patch("/profile/" + profileUser._id, data)
      .then((res) => {
        if(res.data.success) {
            handleUser(res.data.data);
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
        } else {
          localStorage.clear();
          history.push('/sign-in');
          console.log(res.data.message)
        }
      })
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...initialUserState, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="row m-0">
        <div className="col-sm-6 mt-3 col-md-3 mx-auto">
          <div className="card">
            <div className="card-header text-center">
              <div
                className="img"
                style={{
                  position: "relative",
                  borderRadius: "50%",
                  maxWidth: "100%",
                }}
              >
                <img
                  src={userImage}
                  alt={user.name}
                  style={{ maxWidth: "100%" }}
                  ref={profileImg}
                />
                <input
                  type="file"
                  id="upload-profile-img"
                  name="img"
                  onChange={imageHandler}
                  className="d-none"
                />
                <label
                  htmlFor="upload-profile-img"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <AiOutlineCamera
                    style={{ fontSize: "30px", cursor: "pointer" }}
                  />
                </label>
              </div>
            </div>
            <div className="card-body">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={inputHandle}
                defaultValue={user.name}
                className="form-control"
                ref={nameInputRef}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={inputHandle}
                defaultValue={user.email}
                className="form-control mt-2"
                ref={emailInputRef}
              />
              <input
                type="password"
                name="password"
                onChange={inputHandle}
                placeholder="Password"
                defaultValue={user.password}
                className="form-control mt-2 mb-2"
                ref={passwordInputRef}
              />
              <button onClick={submitHandle} className="btn btn-success">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
