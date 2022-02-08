import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { navLinks } from "../utils/navLinks";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store";
import GenericModal from "./GenericModal";
import LoginForm from "./LoginForm";

const NavMenu = () => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const userName = useSelector((state: any) => state.auth.userName);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const logoutHandler = () => {
    setModalShow(false);
    dispatch(loginActions.logout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Rick and Morty logo"
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ borderRadius: "50%" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((nav) => {
              return (
                <Nav.Link href={nav.path} key={nav.name}>
                  {nav.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Navbar.Text>Signed in as: {userName}</Navbar.Text>
                <Navbar.Text>
                  <button
                    className="px-3 pb-1 rounded border-2 border-gray-200 text-gray-400 hover:bg-gray-600 hover:text-white transition-all ease-in-out duration-400 hover:scale-110"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </Navbar.Text>
              </>
            ) : (
              <Navbar.Text>
                <button
                  className="px-3 pb-1 rounded border-2 border-gray-200 text-gray-400 hover:bg-gray-600 hover:text-white transition-all ease-in-out duration-400 hover:scale-110"
                  onClick={() => setModalShow(true)}
                >
                  Login
                </button>
                <GenericModal modalShow={modalShow} setModalShow={setModalShow}>
                  <LoginForm />
                </GenericModal>
              </Navbar.Text>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
