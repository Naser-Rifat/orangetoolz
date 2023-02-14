import { ADD_TASK, MOVE_TASK } from "../types";

const initialState = {
  tasks: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    case MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, column: action.payload.column }
            : task
        ),
      };
    default:
      return state;
  }
}

export default rootReducer;
