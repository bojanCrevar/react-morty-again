import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { navLinks } from "../utils/navLinks";
import styles from "./NavMenu.module.css";
import GenericModal from "./GenericModal";
import LoginForm from "./LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";

const NavMenu = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);

  const [modalShow, setModalShow] = useState(false);

  function logoutHandler() {
    setModalShow(false);
    dispatch(authActions.logout());
  }

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
          <div className={styles.divider}></div>

          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Navbar.Text>Signed in as: {username}</Navbar.Text>
                <Navbar.Text>
                  <button
                    className="px-4 py-2 rounded border-2 border-gray-200 text-gray-400 hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-400 hover:scale-110"
                    onClick={logoutHandler}
                  >
                    Log out
                  </button>
                </Navbar.Text>
              </>
            ) : (
              <Navbar.Text>
                <button
                  className="px-4 py-2 rounded border-2 border-gray-200 text-gray-400 hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-400 hover:scale-110"
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
