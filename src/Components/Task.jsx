import React from "react";

export function Task(props) {
  const {
    id = 0,
    // title = "",
    description = "",
    // status = true,
    //onStatusChange,
  } = props;

  //   function handleStatusChange(e) {
  //     onStatusChange(id, e.target.value);
  //   }

  return (
    <div className="task">
      <div className="task__title">{description.title}</div>
      {/* <div className="task__description">{description}</div> */}
      <div className="task__status">
        <select
          value={description.status}
          // onChange={handleStatusChange}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}

export default Task;
