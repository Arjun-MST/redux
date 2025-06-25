import { createAsyncThunk } from "@reduxjs/toolkit";
const url = 'https://api.freeapi.app/api/v1/todos?query=reactjs&complete=false';
const options = {method: 'GET', headers: {accept: 'application/json'}};

export const getAllTasks = createAsyncThunk("getAllTasks", async () => {
   const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
});
