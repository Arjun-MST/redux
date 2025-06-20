
import React from 'react'
import { useEffect, useState } from "react";
import Task from "../components/Task";
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/taskSlice';
function Home() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const tasks = useSelector((state)=>state.taskSlice.tasks);
  const dispatch = useDispatch()
  useEffect(() => {
    fetchTodo();
  }, []);
  const handleChange = async () => {
    try {
       const response = await fetch("https://api.freeapi.app/api/v1/todos/", {
      method: "POST",
      body: JSON.stringify({
        title: input,
        description: description,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data in add", data);
   dispatch(setTasks(data));

    console.log("added task here ",tasks);
    setInput(" ");
    setDescription(" ");
    } catch (error) {
      alert(error)
    }
   
  };
  const fetchTodo = async () => {
    try {
       const response = await fetch("https://api.freeapi.app/api/v1/todos", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const data = await response.json();
    // console.log(data,"hi")
    dispatch(setTasks(data?.data.slice(0,10)));
    } catch (error) {
      alert(error)
    }
   
  };

  const handleTodo = async (todos) => {
    // console.log(todos)
    const req = await fetch(
      `https://api.freeapi.app/api/v1/todos/${todos._id}`,
      { method: "DELETE", headers: { accept: "application/json" } }
    );
    const data = await req.json();
    console.log(data);

    dispatch(setTasks((prev) => prev.filter((task) => task._id !== todos._id)));
    alert(data.message);
  };
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
    <h1 className="text-2xl font-bold text-gray-800 text-center">Add New Task</h1>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-600">Title</label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter task title"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-600">Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Enter task description"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <button
        onClick={handleChange}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
        Add Task
      </button>
    </div>

    <div className="pt-6 border-t border-gray-200">
      <Task  handleTodo={handleTodo} />
    </div>
  </div>
</div>

  );
}
export default Home;
