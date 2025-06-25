import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/taskSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Task({ handleTodo, fetchTodo }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const [editDescription, setEditDescription] = useState("");
  const dispatch = useDispatch();
  const startEdit = (task, index) => {
    setEditIndex(index);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };
  const submitEdit = async (task) => {
    try {
        const Change = await fetch(
      `https://api.freeapi.app/api/v1/todos/${task._id}`,
      {
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
        method: "PATCH",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    const data = await Change.json();
    console.log(data);
    fetchTodo();
    toast.success("task edited successfully ")
    setEditIndex(null);
    } catch (error) {
      toast.error("task didn't edited")
      
    }
  
  };

  return (
   <div className="space-y-4 pt-6 relative">
  {tasks.map((task, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500"
    >
      <p className="text-lg font-semibold text-gray-800 mb-1">
        <span className="text-purple-600">Title:</span> {task.title}h
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="text-purple-600">Description:</span> {task.description}
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => startEdit(task, index)}
          className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-md transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => handleTodo(task)}
          className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition duration-300"
        >
          Mark as Done
        </button>
      </div>
    </div>
  ))}
  {editIndex !== null && (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl relative">
        <h2 className="text-xl font-semibold  text-center">Edit Task</h2>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Edit title"
          className="w-full mb-3 p-3 border border-gray-300 rounded"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Edit description"
          className="w-full mb-4 p-3 border border-gray-300 rounded resize-none"
          rows={2}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEditIndex(null)}
            className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => submitEdit(tasks[editIndex])}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}

  <ToastContainer />
</div>

  );
}

export default Task;
