import { ADD_TASK, MOVE_TASK, REMOVE_TASK } from "../types";

const initialState = {
  columns: [
    {
      id: "todo",
      title: "To do",
      tasks: [],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ],
};

const tasksReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === action.payload.task.id) {
            return {
              ...column,
              tasks: [...column.tasks, action.payload.task],
            };
          }
          return column;
        }),
      };
    case MOVE_TASK:
      const { task, sourceColumnId, destinationColumnId } = action.payload;
      const sourceColumn = state.columns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = state.columns.find(
        (column) => column.id === destinationColumnId
      );
      const filteredTasks = sourceColumn.tasks.filter((t) => t.id !== task.id);
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === sourceColumnId) {
            return {
              ...column,
              tasks: filteredTasks,
            };
          }
          if (column.id === destinationColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, task],
            };
          }
          return column;
        }),
      };
    case REMOVE_TASK:
      const { taskId, columnId } = action.payload;
      const targetColumn = state.columns.find(
        (column) => column.id === columnId
      );
      const filteredTasksAfterRemoval = targetColumn.tasks.filter(
        (t) => t.id !== taskId
      );
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: filteredTasksAfterRemoval,
            };
          }
          return column;
        }),
      };
    default:
      return state;
  }
};

export default tasksReducer;
