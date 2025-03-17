import { configureStore } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import shoes from "./store/shoesSlice";
import stock from "./store/stockSlice";

export default configureStore({
    
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    shoes: shoes.reducer,
  },
});
