import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Form,
  Button,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import productData from "./data.js";
import { DetailPageItem } from "./detailPageItems.js";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  let [product, setProduct] = useState(productData);

  return (
    <div className="App">
      <NewNavbar />
      <Switch>
        <Route exact path="/">
          <Jumbotron />
          <ShopItemList product={product} />
          <button className="btn btn-primary m-5" onClick={loadItems}>
            더보기
          </button>
        </Route>
        <Route path="/detail/:id">
          <DetailPageItem product={product} />
        </Route>
      </Switch>
    </div>
  );
}

function NewNavbar() {
  return (
    <Navbar bg="white" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} className="link" to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} className="link" to="detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

function Jumbotron() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">premium shoe market!</h1>
      <p className="lead">All the shoes you want are on our page</p>
      <hr className="my-4" />
      <p>
        Reasonable price <br />
        The highest quality
      </p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Buy now
        </a>
      </p>
    </div>
  );
}

function ShopItemList(props) {
  return (
    <div className="container">
      <div className="row shopItemList">
        {props.product.map((e, i) => {
          return <ShopItems product={e} index={i} key={e.id} />;
        })}
      </div>
    </div>
  );
}

function ShopItems(props) {
  return (
    <div className="col-md-4 shopItem">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`}
      />
      <h5>{props.product.title}</h5>
      <p>{props.product.content}</p>
      <p>{props.product.price}</p>
    </div>
  );
}

function loadItems() {
  axios
    .get("https://codingapple1.github.io/shop/data2.json")
    .then((json) => {
      let newProduct = json.data;
      let copyProduct = [...product];
      copyProduct.push(...newProduct);
      setProduct(copyProduct);
    })
    .catch(() => {
      alert("서버 요청에 실패했습니다.");
    });
}

export default App;
