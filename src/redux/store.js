import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice"
const Store = configureStore({
    reducer:{
       taskSlice
    }
})

export default Store