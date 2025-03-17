import { Button, Table } from "react-bootstrap";

import { Context1 } from "./../App.jsx"; //context는 export로 보내고, 사용은 컴포넌트처럼?
import { useDispatch, useSelector } from "react-redux";
import { addCount, changeName } from "../store.jsx";

function Cart() {
  let shoes = useSelector((state) => {
    return state.shoes;
  });
  let dispatch = useDispatch()
  //console.log(shoes)
  console.log(shoes[1].name);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {shoes.map((target, i) => {
            return (
              <tr key={i}>
                <td>1</td>
                <td>{target.name}</td>
                <td>{target.count}</td>
                <td>
                    <button onClick={()=>{
                        dispatch(addCount(i))
                    }}>+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Cart;
