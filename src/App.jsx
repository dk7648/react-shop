import { Suspense, lazy, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import data from "./data.js";
// import Detail from "./routes/detail.jsx";
// import Cart from "./routes/Cart.jsx";
import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";


const Detail = lazy(() => import("./routes/detail.jsx"));
const Cart = lazy(() => import("./routes/Cart.jsx"));

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched"))
      localStorage.setItem("watched", JSON.stringify([]));
  }, []);
  let [shoes, setShoes] = useState(data);
  let [btnCounter, setBtnCounter] = useState(0);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const {
    data: result,
    isLoading,
  } = useQuery({
    queryKey: ["작명"],
    queryFn: () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((res) => {
        return res.data;
      }),
  });

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
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {isLoading ? <p>로딩중</p> : <p>{result.name}</p>}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중!</div>}>
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
                      return (
                        <>
                          {i%3==0 && <p></p>}
                          <Card navigate={navigate} key={i} shoes={target} />
                        </>
                      );
                    })}
                  </Row>
                </Container>
                <Button
                  onClick={() => {
                    setLoading(true);
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
                        alert("마지막 상품입니다.");
                        setLoading(false);
                      });
                  }}
                  variant="primary"
                >
                  상품 목록 가져오기
                </Button>
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
                <Detail shoes={shoes} key={shoes.length} />
            }
          />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<h4>회사 멤버</h4>} />
            <Route path="location" element={<h4>회사 위치</h4>} />
          </Route>

          <Route path="/cart" element={<Cart />} />

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
      </Suspense>
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
      <a href={"/detail/" + props.shoes.id}>
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" +
            (props.shoes.id + 1) +
            ".jpg"
          }
          width="80%"
        />
        <h4>{props.shoes.title}</h4>
      </a>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  );
}
export default App;
