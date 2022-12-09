import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { themeContext } from '../pages/_app';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from 'react-icons/bs';

export default function Header() {
  const theme = useContext(themeContext);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/carts')
      .then((res) => res.json())
      .then((data) => setTotal(data));
  }, [theme.isLoad]);

  const totalQuantity = total.reduce((g, item) => g + item.quatity, 0);

  return (
    <Navbar bg="light" expand="lg" className="fixed">
      <Container fluid>
        <Navbar.Brand href="#">Post</Navbar.Brand>

        <Navbar.Toggle aria-controls="Post" />
        <Navbar.Collapse id="Post">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav>
              <Link href="/" legacyBehavior>
                <a style={{ textDecoration: 'none', color: 'black' }}>Home</a>
              </Link>
            </Nav>
            <Nav>
              <Link href="/posts" legacyBehavior>
                <a
                  className="ml-2"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Post
                </a>
              </Link>
            </Nav>
            <Nav>
              <Link href="/login" legacyBehavior>
                <a
                  className="ml-2"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Login
                </a>
              </Link>
            </Nav>
            <Nav>
              <Link href="/admin" legacyBehavior>
                <a
                  className="ml-2"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Admin
                </a>
              </Link>
            </Nav>
          </Nav>
          <Navbar.Brand className="relative">
            <div className="bg-red-800 w-4 text-center rounded-[50%] absolute top-[-0.4rem] left-[2rem]  h-4 text-[10px] text-white">
              {totalQuantity}
            </div>
            <Link href="/carts" legacyBehavior>
              <a
                className=""
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <BsFillCartFill className="ml-2  text-2xl" />
              </a>
            </Link>
          </Navbar.Brand>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
