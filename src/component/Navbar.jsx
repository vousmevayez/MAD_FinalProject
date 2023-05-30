import React, { useRef } from "react";
import { setSearchedShow } from "../redux/reducer";
import { useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavigationBar({ signedInUsername }) {
  const dispatch = useDispatch();
  const input = useRef();
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    if (input.current.value.length > 1) {
      fetch(`https://api.tvmaze.com/search/shows?q=${input.current.value}`)
        .then((resp) => resp.json())
        .then((data) =>
          dispatch(
            setSearchedShow(
              data.map((item) => {
                return item.show;
              })
            )
          )
        );
      navigate("/Search");
      input.current.value = "";
    } else alert("Typing at least 2 letters to search");
  };
  return (
    <Navbar fixed="top" bg="white">
      <Navbar.Brand href="/">EA Series</Navbar.Brand>
      <Nav className="me-auto">
        <NavDropdown title="Category" id="basic-nav-dropdown">
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/Action">Action</NavDropdown.Item>
          <NavDropdown.Item href="/Crime">Crime</NavDropdown.Item>
          <NavDropdown.Item href="/Drama">Drama</NavDropdown.Item>
          <NavDropdown.Item href="/Fantasy">Fantasy</NavDropdown.Item>
          <NavDropdown.Item href="/Legal">Legal</NavDropdown.Item>
          <NavDropdown.Item href="/Medical">Medical</NavDropdown.Item>
          <NavDropdown.Item href="/Romance">Romance</NavDropdown.Item>
          <NavDropdown.Item href="/Science-Fiction">
            Science-Fiction
          </NavDropdown.Item>
          <NavDropdown.Item href="/Thriller">Thriller</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form className="d-flex" onSubmit={search}>
        <Form.Control
          ref={input}
          type="search"
          placeholder="Looking for what?"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="light" type="submit">
          Search
        </Button>
      </Form>
      {/* <Navbar.Brand href="./Register">
        <span className="user-icon">&#x1F464;</span>
      </Navbar.Brand> */}
      <Navbar.Brand href="./Register">
        {/* <span className="user-icon"> &#x1F464;</span> */}
        Sign In
      </Navbar.Brand>
      {/* <Nav className="ms-auto">
        <Nav.Item>{signedInUsername}</Nav.Item>
      </Nav> */}
    </Navbar>
  );
}
