import React, { useState, useEffect } from "react";
import moment from "moment";
import Notificaton from "./Notificaton";

function AlarmClock({ habit, updateHabits, setShowAlarm, setTime, time}) {
  const [reminder, setReminder] = useState(habit.riminders[0].time)


  // if (moment(reminder).format("HH:mm:ss") === time) {
  //  alert("Start working please")
  // }

  function handleAlarmSubmit(e) {
    e.preventDefault();
    fetch(`/riminders/${habit.riminders[0].id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: e.target.elements.alarmTime.value,
      }),
    })
      .then((response) => response.json())
      .then((updatedReminder) => updateHabits(updatedReminder));
    setShowAlarm(false);
  }
  return (
    <div>
    
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold text-gray-800">{/* {time} */}</h1>

        <form onSubmit={handleAlarmSubmit}>
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
    </div>
  );
}

export default AlarmClock;
