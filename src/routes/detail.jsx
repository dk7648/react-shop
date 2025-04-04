import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { push } from "../store/shoesSlice.jsx";
function Detail(props) {
  let [input, setInput] = useState("");
  let [Alert, setAlert] = useState(true);
  let [tap, setTap] = useState(0);
  let [fade, setFade] = useState("");

  let { id } = useParams();
  let target = props.shoes.find((e) => e.id == id);

  let dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(input)) {
      alert("숫자만 입력하세요");
    }
  }, [input]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
      clearTimeout(timer);
    };
  }, [props.tap]);

  useEffect(() => {
    //localStorage.removeItem("watched")
    let watched = localStorage.getItem("watched");
    watched = JSON.parse(watched)
    watched.push(id);
    watched = new Set(watched)
    watched = Array.from(watched)
    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);
  return (
    
    <div className={"container start " + fade}>
      {Alert ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (target.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <h4 className="pt-5">{target.title}</h4>
          <p>{target.content}</p>
          <p>{target.price}원</p>
          <button
            onClick={() => {
              dispatch(push({ id: target.id, name: target.title, count: 1 }));
              alert("장바구니에 담겼습니다.")
            }}
            className="btn btn-danger"
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTap(0);
            }}
          >
            상품 설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTap(1);
            }}
          >
            상품 후기
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTap(2);
            }}
          >
            상세 정보
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} />
    </div>
  );
}

function TapContent(props) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
      clearTimeout(timer);
    };
  }, [props.tap]);
  return (
    <div className={"start " + fade}>
      {[<div>상품 설명입니다.</div>, <div>상품 후기입니다.</div>, <div>상세 정보입니다.</div>][props.tap]}
    </div>
  );
}

export default Detail;
