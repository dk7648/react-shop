
import { Table } from "react-bootstrap";

import { Context1 } from "./../App.jsx"; //context는 export로 보내고, 사용은 컴포넌트처럼?

function Cart() {
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
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Cart;
