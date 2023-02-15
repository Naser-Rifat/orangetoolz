import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { v4 as uuidv4 ,} from "uuid";
import { v4 as uuidv4 } from "uuid";

import { TaskList } from "../Components/TaskList";
import { ADD_TASK, MOVE_TASK } from "../Redux/types";
import { addTask, moveTask } from "../Redux/Actions/actiontypes";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);
  const [taskInput, setTaskInput] = useState(tasks);
  // const columnsFromBackend = {
  //   [uuidv4()]: {
  //     name: "Requested",
  //     items: tasks,
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
  // };
  // useEffect(() => {
  //   Object.entries(columnsFromBackend).map((key, i) => {
  //     if (key[1].name === "Requested") {
  //       columnsFromBackend[key[1].items] = tasks;
  //     }
  //   });
  // }, [tasks]);
  // const [allTaskInputColumn, setallTaskInputColumn] =
  //   useState(columnsFromBackend);
  // useEffect(() => {
  //   setallTaskInputColumn();
  // }, [tasks]);
  // const itemsFromBackend = [
  //   { id: uuidv4(), title: "First task" },
  //   { id: uuidv4(), title: "Second task" },
  //   { id: uuidv4(), title: "Third task" },
  //   { id: uuidv4(), title: "Fourth task" },
  //   { id: uuidv4(), title: "Fifth task" },
  // ];

  // console.log(tasks);
  // console.log(itemsFromBackend);
  // console.log(columnsFromBackend);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch(
        MOVE_TASK({
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
          // taskId: draggableId,
          // source: source.droppableId,
          // destination: destination.droppableId,
          // position: destination.index,
        })
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // useEffect(() => {
  //   const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  //   if (storedTasks) {
  //     dispatch({ type: "SET_TASKS", payload: storedTasks });
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleTaskInputChange = (e) => {
    console.log(e.target.value);
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput) {
      dispatch(addTask({ id: uuidv4(), title: taskInput, status: "todo" }));
      setTaskInput("");
    }
  };

  const handleDragEnd = (result) => {
    console.log(result);
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        source: source.droppableId,
        destination: destination.droppableId,
        position: destination.index,
      })
    );
  };
  const [columns, setColumns] = useState(tasks);

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={handleTaskInputChange}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      {/* <DragDropContext onDropEnd={(result) => handleDragEnd(result)}>
        <div className="task-list">
          <TaskList status="todo" tasks={tasks} />
          <TaskList status="inprogress" tasks={tasks} />
          <TaskList status="done" tasks={tasks} />
        </div>
      </DragDropContext> */}
      {/* <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext> */}
    </div>
  );
};

export default KanbanBoard;
