import { createSlice } from "@reduxjs/toolkit";

const initialState={
  items:localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total")
  ? JSON.parse(localStorage.getItem("total")): 0,
  totalItems: localStorage.getItem("totalItems")
  ? JSON.parse(localStorage.getItem("totalItems")): 0,
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const cart_item = action.payload
      const index = state.items.findIndex((item)=>item._id === cart_item._id)

      
      state.items.push(cart_item);
      state.totalItems++
      state.total+=cart_item.price;

      localStorage.setItem("cart",JSON.stringify(state.items))
      localStorage.setItem("total",JSON.stringify(state.total))
      localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
      
    },
    removeItem: (state, action) => {
      const item_id = action.payload;
      console.log(state.items.findIndex((item)=>item_id===item.card.info.id));
      const index = state.items.findIndex((item)=>item.card.info.id ===item_id)
      console.log("Item id",item_id);
      console.log("Index:",index);
      console.log(state.items[index].card.info.price);
        state.totalItems--
        state.total-=state.items[index].card.info.price
        state.items.splice(index,1);

        localStorage.setItem("cart",JSON.stringify(state.items))
        localStorage.setItem("total",JSON.stringify(state.total));
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

      
      
    },
    clearItem: (state) => {
      state.items=[]
      state.total=0;
      state.totalItems=0

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export default userSlice.reducer;
export const { addItem, removeItem, clearItem } = userSlice.actions;
