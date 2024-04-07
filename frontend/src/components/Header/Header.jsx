import React, { useRef, useEffect , useContext, useState} from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link , useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./Header.css";

import {AuthContext} from './../../context/AuthContext'


const nav_links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
   {
    path: "/Weather",
     display: "Weather"
   },
   {
    path: "/generate",
    display: "Itinerary"
   },
   {
    path: "/Map",
    display: "Map"
   },


];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  const {user, dispatch} = useContext(AuthContext)

  const logout = () => {
    dispatch({type:'LOGOUT'})
    navigate('/')
  }

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ================logo =============== */}
            <div className='logo'>
              <img src={logo} alt="" />
            </div>
            {/* ================logo end=============== */}
            {/* ================menu start=============== */}
            <div className={`navigation ${isMenuOpen ? "show__menu" : ""}`} ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-item-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} className={(navClass) => (navClass.isActive ? "active_link" : "")}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ================menu end =============== */}

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d- flex align-items-center gap-4">

              {
                user? (<>
                <h5 className="mb-0 p-2 logged__in_h5">
                      {user.username.charAt(0).toUpperCase() +
                        user.username.slice(1)}
                    </h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                </>
                ): (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                  
                )
              }

                
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                {/* Use the icon class to render the close icon */}
                {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
              </span>
            </div>
          </div>
        </Row>
      </Container>
  
    </header>
  );
};

export default Header;
