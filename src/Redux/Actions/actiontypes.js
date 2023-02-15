import { v4 as uuidv4 } from "uuid";

export const ADD_TASK = "ADD_TASK";
export const MOVE_TASK = "MOVE_TASK";

export function addTask(task) {
  console.log(task);
  return {
    type: ADD_TASK,
    payload: {
      task,

      // task: {
      //   id: new Date().getTime(),
      //   description: task,
      //   column: "To Do",
      // },
    },
  };
}

export function moveTask(taskId, column) {
  console.log();
  return {
    type: MOVE_TASK,
    payload: {
      taskId,
      column,
    },
  };
}

// : {
//   [uuidv4()]: {
//     name: "Requested",
//     items: task,
//   },
//   [uuidv4()]: {
//     name: "To do",
//     items: [],
//   },
//   [uuidv4()]: {
//     name: "In Progress",
//     items: [],
//   },
//   [uuidv4()]: {
//     name: "Done",
//     items: [],
//   },
// },
