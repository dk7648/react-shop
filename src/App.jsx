import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link } from 'react-router-dom';
import data from "./data.js";
import Detail from "./routes/detail.jsx";
import "./App.css";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      




      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Features</Nav.Link>
            <Nav.Link href="/about">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
              <Container>
                <Row>
                  {shoes.map((target, i) => {
                    return <Card key={i} i={i} shoes={target} />;
                  })}
                </Row>
              </Container>
            <Button variant="primary">Primary</Button>
          </>
        }/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/about" element={<>어바웃 페이지</>}/>
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <Col sm>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  );
}
export default App;
