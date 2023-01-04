import React from 'react'
import { useState, useEffect } from 'react';

function Reminder({reminder, updateReminders}) {
    const [time, setTime] = useState(new Date());
    console.log("Time:", time);
    const [alarmTime, setAlarmTime] = useState(null);
    console.log("AlarmTime:", alarmTime);
    const [isAlarmOn, setIsAlarmOn] = useState(false);
  
  
  
  
  console.log(reminder)
  
    function handleAlarmSubmit(e) {
      e.preventDefault();
      setAlarmTime(e.target.elements.alarmTime.value);
      fetch(`/riminders/${reminder.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          time: e.target.elements.alarmTime.value
        })
      })
      .then(response => response.json())
      .then(updatedReminder => updateReminders(updatedReminder))
      setIsAlarmOn(true);
    }
  
    function handleAlarmOff() {
      setAlarmTime(null);
      setIsAlarmOn(false);
    }
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-800">
        {time.toLocaleTimeString()}
      </h1>
      {isAlarmOn ? (
        <button
          onClick={handleAlarmOff}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Turn off alarm
        </button>
      ) : (
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
      )}
    </div>
  );
}

export default Reminder