import React, { useState, useEffect } from "react";
import moment from "moment";

function AlarmClock({ habit, updateHabits, setShowAlarm, setTime, time }) {
  const [reminder, setReminder] = useState(habit.riminders[0]);
  console.log("reminder time:",moment(reminder.time).format("HH:mm:ss"));

  // const [time, setTime] = useState(new Date().toLocaleTimeString("en-SE"));
  // console.log("Time:", time);
  const [alarmTime, setAlarmTime] = useState(null);
  console.log("AlarmTime:", alarmTime);




  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-SE"));
    }, 1000);
    if(moment(reminder.time).format("HH:mm:ss") === time) {
      alert("I did it!")
    }

  },[])

  function handleAlarmSubmit(e) {
    e.preventDefault();
    setAlarmTime(e.target.elements.alarmTime.value);
    fetch(`/riminders/${habit.riminders[0].id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: e.target.elements.alarmTime.value,
      }),
    })
      .then((response) => response.json())
      .then((updatedReminder) => updateHabits(updatedReminder));
    // setIsAlarmOn(true);
    setShowAlarm(false)
  }
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl font-bold text-gray-800">
          {/* {time} */}
        </h1>
        
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
