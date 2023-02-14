import Task from "./Task";

export function TaskList(props) {
  const { tasks, onTaskStatusChange } = props;

  const taskItems = {
    todo: [],
    inProgress: [],
    done: [],
  };

  tasks.forEach((task) => {
    console.log(task.description.status);
    taskItems[task.description.status].push(
      <Task
        key={task.id}
        id={task.id}
        // status={task.description.status}
        // title={task.title}
        description={task.description}
        // onStatusChange={onTaskStatusChange}
      />
    );
  });

  return (
    <div className="taskList">
      <div className="taskList__header">{props.status}</div>
      {taskItems[props.status]}
    </div>
  );
}
