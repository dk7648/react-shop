import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import data from "./data.js";
import Detail from "./routes/detail.jsx";
import axios from "axios";
import "./App.css";

function App() {
  let [shoes, setShoes] = useState(data);
  let [btnCounter, setBtnCounter] = useState(0);
  console.log(typeof btnCounter);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {loading ? (
                <div className="alert alert-warning">로딩중</div>
              ) : null}

              <div className="main-bg"></div>
              <Container>
                <Row>
                  {shoes.map((target, i) => {
                    return <Card navigate={navigate} key={i} shoes={target} />;
                  })}
                </Row>
              </Container>
              <Button
                onClick={() => {
                  setLoading(true);
                  console.log(btnCounter);
                  axios
                    .get(
                      "https://codingapple1.github.io/shop/data" +
                        (btnCounter + 2) +
                        ".json"
                    )
                    .then((result) => {
                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                      setBtnCounter(btnCounter + 1);
                      setLoading(false);
                    })
                    .catch(() => {
                      alert("데이터 받기 실패 ㅠㅠ");
                      setLoading(false);
                    });
                }}
                variant="primary"
              >
                데이터 받기
              </Button>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<h4>회사 멤버</h4>} />
          <Route path="location" element={<h4>회사 위치</h4>} />
        </Route>

        <Route
          path="/event"
          element={
            <div>
              <h4>오늘의 이벤트</h4>
              <Outlet />
            </div>
          }
        >
          <Route path="one" element={<h4>첫 주문시 양배추즙 서비스</h4>} />
          <Route path="two" element={<h4>생일 기념 쿠폰 받기</h4>} />
        </Route>

        <Route path="*" element={<>없는 페이지입니다.</>} />
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
  );
}
function Card(props) {
  return (
    <Col sm>
      <a href={"/detail/"+props.shoes.id}><img
        src={
          "https://codingapple1.github.io/shop/shoes" +
          (props.shoes.id + 1) +
          ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4></a>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  );
}
export default App;
