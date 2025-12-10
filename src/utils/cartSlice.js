import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({

    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{//reducer function
              state.items.push(action.payload);
              //mutating our state here
        },
        removeItems:(state,action)=>{
            state.items.pop(action.payload)
        },
        clearCart:(state,action)=>{
            state.items.length=0;
        }
    }
})
export const {addItem,removeItems,clearCart}=cartSlice.actions;
export default cartSlice.reducer;