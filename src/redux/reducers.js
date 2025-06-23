export const addTaskAction = (state, action) => {
  state.tasks = [...state.tasks, action.payload];
};
export const setTasksAction = (state, action) => {
  state.tasks = action.payload;
};
export const deleteTaskAction = (state, action) => {
  state.tasks = state.tasks.filter((task) => task._id !== action.payload);
};
