import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"taskSlice",
    initialState:{
        tasks : [] || null
    },
    reducers:{
        setTasks :(state,action)=>{
           state.tasks.push(action.payload);
            // console.log(action);
        }
        

    }
})
export const {setTasks} = taskSlice.actions
export default taskSlice.reducer;