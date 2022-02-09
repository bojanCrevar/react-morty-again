import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { navLinks } from "../utils/navLinks";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import GenericModal from "./GenericModal";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { RootState } from "../model/storeModel";

const NavMenu = () => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const userName = useSelector((state: RootState) => state.auth.userName);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const logoutHandler = () => {
    setModalShow(false);
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <img
            alt="Rick and Morty logo"
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            style={{ borderRadius: "50%" }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((nav) => {
              return (
                // <Nav.Link href={nav.path} key={nav.name}>
                //   {nav.name}
                // </Nav.Link>
                <Link href={nav.path} key={nav.name} passHref>
                  <Nav.Link>{nav.name}</Nav.Link>
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Navbar.Text>
                  Signed in as: <span className="font-bold">{userName}</span>
                </Navbar.Text>
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
