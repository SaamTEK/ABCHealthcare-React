import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

export default function NavbarComponent({ handleLogout }) {
  const { user } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            ABC Healthcare
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/cart"
              className="mx-2 my-2 my-lg-0"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </NavLink>
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="mx-2 my-2 my-lg-0"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="mx-2 my-2 my-lg-0"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                {user.Roles === "Admin" ? (
                  <NavLink
                    className="mx-2 my-2 my-lg-0"
                    style={{ textDecoration: "none" }}
                    to="admin"
                  >
                    Admin
                  </NavLink>
                ) : (
                  <NavLink
                    className="mx-2 my-2 my-lg-0"
                    style={{ textDecoration: "none" }}
                    to="#"
                  >
                    Profile
                  </NavLink>
                )}
                <NavLink
                  onClick={handleLogout}
                  className="mx-2 my-2 my-lg-0"
                  style={{ textDecoration: "none" }}
                  to="#"
                >
                  Log out
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
