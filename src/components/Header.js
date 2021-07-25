import {useContext} from 'react';
import { Link } from "react-router-dom";
import DefaultProfileImage from "../assets/images/profileDefault.jpg";
import { Navbar } from "react-bootstrap";
import GlobalContext from '../context/GlobalContext';

export default function HeaderComponent() {
  const {profileImg} = useContext(GlobalContext);
  console.log(profileImg);
  const logOutHandle = () => {
    localStorage.clear();
  };
  return (
    <>
      <Navbar bg="light" className="px-3" expand="lg" >
        <Navbar.Brand href="#home">
          <Link to="/cars" className="header-brand text-dark ">
            Cars
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="w-100 text-end">
            <Link to="/cars/new" className="btn btn-outline-success me-2">
              +Add
            </Link>
            <Link
              to="/sign-in"
              className="btn btn-outline-danger me-2"
              onClick={logOutHandle}
            >
              Log out
            </Link>
            <Link to="/profile">
              <img
                src={profileImg || DefaultProfileImage}
                height="40px"
                width="40px"
                style={{
                  borderRadius: '50%'
                }}
                alt="default profile"
              />
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
