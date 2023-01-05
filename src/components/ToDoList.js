import React, { useState } from "react";
import ToDo from "./ToDo";

function ToDoList({ user, time }) {
  const [todoList, setTodoList] = useState(user.to_do_lists);
  console.log(todoList);

  const [taskForm, setTaskForm] = useState("");
  console.log("taskForm:", taskForm);

  function addToDo(newToDo) {
    setTodoList([...todoList, newToDo]);
  }

  function updateToDoList(updatedToDo) {
    const updatedToDoList = todoList.map((todo) => {
      if (todo.id === updatedToDo.id) {
        return updatedToDo;
      } else {
        return todo;
      }
    });
    setTodoList(updatedToDoList);
  }

  function onDeleteToDo(deletedToDo) {
    const updateDelete = todoList.filter((todo) => todo.id !== deletedToDo);
    setTodoList(updateDelete);
  }

  function handleNewToDo(e) {
    e.preventDefault();
    fetch("/to_do_lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: taskForm,
      }),
    })
      .then((r) => r.json())
      .then(addToDo);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">To Do List</h1>
      <form className="mb-4" onSubmit={handleNewToDo}>
        <input
          className="border rounded border-blue-500 py-2 px-3"
          type="text"
          name="task"
          value={taskForm}
          onChange={(e) => setTaskForm(e.target.value)}
        />
        <button className="bg-blue-500 rounded py-2 px-3 text-white font-bold">
          Add Task
        </button>
      </form>
      <ul class="border border-success text-lg text-center rounded-lg shadow-2xl w-full">
        {todoList.map((todo) => (
          <ToDo
            key={todo.id}
            todo={todo}
            addToDo={addToDo}
            onDeleteToDo={onDeleteToDo}
            updateToDoList={updateToDoList}
            time={time}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
