import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function removeTask(index) {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <form
        className="mb-4"
        onSubmit={(event) => {
          event.preventDefault();
          addTask(event.target.task.value);
          event.target.task.value = "";
        }}
      >
        <input className="border rounded py-2 px-3" type="text" name="task" />
        <button className="bg-blue-500 rounded py-2 px-3 text-white font-bold">
          Add Task
        </button>
      </form>
      <ul className="list-reset">
        {tasks.map((task, index) => (
          <li key={index} className="py-2 flex justify-between">
            {task}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeTask(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
