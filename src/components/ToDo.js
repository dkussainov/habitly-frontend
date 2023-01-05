import React, { useState } from "react";
import moment from "moment";

function ToDo({ todo, onDeleteToDo, updateToDoList, time }) {
  const [showAlarm, setShowAlarm] = useState(false);

  if (moment(todo.time).format("HH:mm:ss") === time) {
    alert(`Reminding about your TO-DO: You have to ${todo.title}!`);
  }

  function handleDelete(e) {
    e.preventDefault();
    fetch(`/to_do_lists/${todo.id}`, { method: "DELETE" }).then(() =>
      onDeleteToDo(todo.id)
    );
  }

  function handleReminder(e) {
    e.preventDefault();
    fetch(`/to_do_lists/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time: e.target.elements.alarmTime.value }),
    })
      .then((response) => response.json())
      .then((updatedReminder) => updateToDoList(updatedReminder));
    setShowAlarm(false);
  }
  return (
    <div class="flex justify-evenly">
      <h1 class="text-xl w-1/5 text-left text-red-600 my-2">{todo.title}</h1>
      <button class="btn btn-ghost text-green-600" onClick={() => setShowAlarm(!showAlarm)}>
        Reminder: {moment(todo.time).format("HH:mm")}
      </button>
      {showAlarm === true ? (
        <div className="flex flex-col items-center justify-center bg-gray-200">
          {/* <h1 className="text-4xl font-bold text-gray-800">{time}</h1> */}

          <form onSubmit={handleReminder}>
            <input
              type="time"
              name="alarmTime"
              className="border rounded-lg p-2"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2"
            >
              Set alarm
            </button>
          </form>
        </div>
      ) : null}
      <button class="w-1/5" onClick={handleDelete}>
        ⚔️
      </button>
    </div>
  );
}

export default ToDo;
