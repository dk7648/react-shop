import { createSlice } from "@reduxjs/toolkit";

let shoes = createSlice({
  name: "shoes",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let src = action.payload
      let dest = state.find((cur) => { return cur.id == src.id})
      console.log(dest.id)
      dest.count += 1;
    },
    push(state, action) {
        let item = action.payload
        let target = state.find((cur)=>{return cur.id == item.id})
        target ? target.count += 1 : state.push(item)
    }
  },
});

export let { addCount, push } = shoes.actions;
export default shoes;
