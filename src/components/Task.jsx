import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/taskSlice";
function Task({ handleTodo }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const tasks = useSelector((state)=>state.taskSlice.tasks)
  const [editDescription, setEditDescription] = useState("");
   const dispatch = useDispatch()
  const startEdit = (task, index) => {
    setEditIndex(index);
    setEditTitle(task.title);
    setEditDescription(task.description);
  }
  const submitEdit =  async(tasks) => {

     const Change = await fetch(
      `https://api.freeapi.app/api/v1/todos/${tasks._id}`,
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
    dispatch(setTasks((prev) => [...prev, data]));
    setEditIndex(null);
  };

  return (
    <div className="space-y-4 pt-6">
      {  tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500"
        >
          {editIndex === index ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Edit title"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Edit description"
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => submitEdit(tasks)}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-800 mb-1">
                <span className="text-purple-600">Title:</span> {task?.title}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="text-purple-600">Description:</span>
                {task.description}
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Task;
