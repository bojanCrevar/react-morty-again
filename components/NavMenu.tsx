import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { navLinks } from "../utils/navLinks";
import { useDispatch, useSelector } from "react-redux";
import GenericModal from "./GenericModal";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { RootState } from "../model/storeModel";
import styles from "./NavMenu.module.css";
import { updateBaseOnLogout } from "../store/auth-actions";
import { Button } from "react-bootstrap";
import { themeActions } from "../store/theme-slice";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const logoutHandler = () => {
    setModalShow(false);

    dispatch(updateBaseOnLogout(auth));
  };

  const toggleTheme = () => {
    dispatch(themeActions.toggleDarkTheme(!theme));
  };

  return (
    <Navbar
      variant={theme ? "dark" : "light"}
      expand="lg"
      className="bg-[#fff] dark:bg-gray-800"
    >
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
                <Link href={nav.path} key={nav.name} passHref>
                  <Nav.Link>{nav.name}</Nav.Link>
                </Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {/* toggle */}
          <Navbar.Text>
            <Button variant="primary" onClick={toggleTheme}>
              Toggle theme
            </Button>
          </Navbar.Text>
          {/* delete */}
          <div className={styles.divider}></div>

          <div className="space-x-4">
            {auth.isAuthenticated ? (
              <>
                <Navbar.Text>
                  Signed in as:{" "}
                  <span className="font-bold">{auth.userName}</span>
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
