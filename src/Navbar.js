import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Button,
  Container,
} from "react-bootstrap";

const navbarData = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Finances",
    to: "/finances",
  },
  {
    id: 3,
    title: "News",
    to: "/news",
  },
  {
    id: 6,
    title: "Insights",
    to: "/insights",
  },
];

const Navbar = ({ onSignOut, loggedIn }) => {
  const authLinks = loggedIn
    ? [
        {
          id: 5,
          title: "Sign Out",
          action: onSignOut,
        },
      ]
    : [
        {
          id: 4,
          title: "Sign In",
          to: "/signin",
        },
      ];

  return (
    <BootstrapNavbar bg="light" expand="md" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Xenon Budget App
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navbarData.map((item) => (
              <Nav.Link as={Link} to={item.to} key={item.id}>
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            {authLinks.map((item) =>
              item.action ? (
                <Button
                  variant="outline-danger"
                  onClick={item.action}
                  key={item.id}
                  className="ms-2"
                >
                  {item.title}
                </Button>
              ) : (
                <Nav.Link as={Link} to={item.to} key={item.id}>
                  {item.title}
                </Nav.Link>
              )
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
