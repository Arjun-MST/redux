import { createSlice } from "@reduxjs/toolkit";

import { getAllTasks } from "./asyncReducer";
import { addTaskAction, deleteTaskAction, setTasksAction } from "./reducers";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {
    tasks: [] || null,
    loader: false,
  },
  reducers: {
    addTask:addTaskAction,
     setTasks :setTasksAction,
    deleteTask :deleteTaskAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
   
        state.loader = true;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loader = false;
      
      })
      .addCase(getAllTasks.pending, (state, action) => {
        state.loader = true;
        
      });
  },
});

export const { setTasks, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
