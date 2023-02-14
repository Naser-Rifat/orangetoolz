export const ADD_TASK = "ADD_TASK";
export const MOVE_TASK = "MOVE_TASK";

export function addTask(task) {
  console.log(task);
  return {
    type: ADD_TASK,
    payload: {
      task: {
        id: new Date().getTime(),
        description: task,
        column: "To Do",
      },
    },
  };
}

export function moveTask(taskId, column) {
  return {
    type: MOVE_TASK,
    payload: {
      taskId,
      column,
    },
  };
}
