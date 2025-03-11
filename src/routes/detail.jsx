import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail(props) {
  useEffect(() => {
    console.log(1)
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000)
    return () => {
      console.log(2);
      clearTimeout(timer)
    }
  }, []);

  let [input, setInput] = useState('');
  let [alert, setAlert] = useState(true);
  let { id } = useParams();
  let target = props.shoes.find((e) => e.id == id);
  return (
    <div className="container">
      {alert ? (
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
          {
            isNaN(input) ? <p>경고: 숫자만 입력해주세요</p> :
            <p>{input}</p>
          }
          <input type="text" onChange={(e) => {setInput(e.target.value)}}/>
          <h4 className="pt-5">{target.title}</h4>
          <p>{target.content}</p>
          <p>{target.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
