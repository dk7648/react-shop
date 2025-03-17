import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { Context1 } from './../App.jsx';//context는 export로 보내고, 사용은 컴포넌트처럼?

function Detail(props) {
  let [input, setInput] = useState("");
  let [Alert, setAlert] = useState(true);
  let [tap, setTap] = useState(0);
  let [fade, setFade] = useState('')

  let { id } = useParams();
  let target = props.shoes.find((e) => e.id == id);

  let {재고} = useContext(Context1)

  useEffect(() => {
    console.log(1);
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      console.log(2);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(input)) {
      alert("숫자만 입력하세요");
    }
  }, [input]);

  useEffect(() => {
    let timer = setTimeout(()=>{setFade('end')},10)
    return () => {
      setFade('')
      clearTimeout(timer)
    }
  },[props.tap])
  return (
    <div className={"container start "+fade}>
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
          <button className="btn btn-danger">주문하기</button>
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
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTap(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTap(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TapContent tap={tap} />
    </div>
  );
}

function TapContent(props) {
  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1);
  useEffect(() => {
    let timer = setTimeout(()=>{setFade('end')},10)
    return () => {
      setFade('')
      clearTimeout(timer)
    }
  },[props.tap])
  return (
    <div className={"start "+fade}>
      {재고}
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tap]}
    </div>
  );
}

export default Detail;
