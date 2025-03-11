import { useParams } from "react-router-dom";
import styled from 'styled-components';

let StyledButton = styled.button`
  background : ${ props => props.bg };
  color : ${props => props.bg=='blue' ? 'white' : 'black'};
  padding : 10px;
`

function Detail(props) {
  let { id } = useParams();
  let target = props.shoes.find((e) => e.id == id)
  return (
    <div className="container">
      <StyledButton bg="blue">버튼입니다</StyledButton>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes"+(target.id+1)+".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">

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
