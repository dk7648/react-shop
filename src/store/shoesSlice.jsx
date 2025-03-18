import { createSlice } from "@reduxjs/toolkit";

let shoes = createSlice({
  name: "shoes",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    modifyCount(state, action) {
      let src = action.payload.target;
      let dest = state.find((cur) => {
        return cur.id == src.id;
      });
      dest.count += action.payload.step;
      if(dest.count == 0) dest.count+=1
    },
    push(state, action) {
      let item = action.payload;
      let target = state.find((cur) => {
        return cur.id == item.id;
      });
      target ? (target.count += 1) : state.push(item);
    },
    removeItem(state, action) {
      let item = action.payload;
      let targetIndex = state.findIndex((cur) => {
        return cur.id == item.id;
      });
      targetIndex == -1 ? null : state.splice(targetIndex, 1);
    },
  },
});

export let { modifyCount, removeItem, push } = shoes.actions;
export default shoes;
