import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { userProfileModel } from "../model/userProfileModel";

interface NavMenuDropdownProps {
  profile: userProfileModel;
  logoutHandler: () => void;
}

function NavMenuDropdown({ profile, logoutHandler }: NavMenuDropdownProps) {
  return (
    <div className="flex">
      <Navbar.Text className="mt-0.5">
        Signed in as:{" "}
        <span className="font-bold">
          {profile.displayName.length ? profile.displayName : profile.userEmail}
        </span>
      </Navbar.Text>
      <NavDropdown
        title={
          <span>
            <img
              alt="Profile logo"
              src={profile.avatar}
              width="30"
              height="30"
              className="d-inline-block align-top mr-2"
              style={{ borderRadius: "50%" }}
            />
          </span>
        }
      >
        <NavDropdown.Item>
          <Navbar.Text>
            <Link href="/profile">
              <span className="dark:text-black">Profile</span>
            </Link>
          </Navbar.Text>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item className="group">
          <Navbar.Text onClick={logoutHandler}>
            <span className="dark:text-[#000] group-hover:text-red-600">
              Logout
              <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-1 " />
            </span>
          </Navbar.Text>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default NavMenuDropdown;
