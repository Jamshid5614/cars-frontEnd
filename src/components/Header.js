import { Link } from "react-router-dom";
import DefaultProfileImage from "../assets/images/profileDefault.jpg";
import { Navbar } from "react-bootstrap";

export default function HeaderComponent() {
  const logOutHAndle = () => {
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
              onClick={logOutHAndle}
            >
              Log out
            </Link>
            <Link to="/profile">
              <img
                src={DefaultProfileImage}
                height="40px"
                alt="default profile"
              />
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
