import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavbarContainer = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Link to="/" className="text-dark">App</Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem className="ml-2">
            <Link to="/about">About</Link>
          </NavItem>
        </Nav>
        <button
          className="btn btn-sm"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            history.push("/login");
          }}
        >
          登出
        </button>
      </Collapse>
    </Navbar>
  );
};

export default NavbarContainer;
