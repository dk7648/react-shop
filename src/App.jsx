import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import data from "./data.js";
import Detail from "./routes/detail.jsx";
import "./App.css";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      




      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
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
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<h4>회사 멤버</h4>}/>
          <Route path="location" element={<h4>회사 위치</h4>}/>
        </Route>

        <Route path="/event" element={<div><h4>오늘의 이벤트</h4><Outlet/></div>}>
          <Route path="one" element={<h4>첫 주문시 양배추즙 서비스</h4>}/>
          <Route path="two" element={<h4>생일 기념 쿠폰 받기</h4>}/>
        </Route>

        <Route path="*" element={<>없는 페이지입니다.</>}/>
      </Routes>
    </div>
  );
}
function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
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
