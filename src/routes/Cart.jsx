import { Button, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { modifyCount, removeItem } from "../store/shoesSlice.jsx";

function Cart() {
  let shoes = useSelector((state) => {
    return state.shoes;
  });
  let dispatch = useDispatch()
  
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
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
                        dispatch(modifyCount({target : target, step: 1}))
                    }}>+</button>
                    <button onClick={()=>{
                        dispatch(modifyCount({target : target, step: -1}))
                    }}>-</button>
                </td>
                <td>
                <button onClick={()=>{
                        dispatch(removeItem(target))
                    }}>삭제</button>
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
