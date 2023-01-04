import { React, useState } from "react";
import AlarmClock from "./AlarmClock";
import moment from "moment";


function HabitCard({ habit, onDeleteHabit, updateHabits, setTime, time }) {
  const [show, setShow] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  // const [reminder, setReminder] = useState(habit.riminders[0].time);
  if (moment(habit.riminders[0].time).format("HH:mm:ss") === time) {
    alert(`${habit.name}, please!`);
  }

  const [progress, setProgress] = useState();

  function openProgressForm() {
    setShow(!show);
  }

  function handleDelete() {
    fetch(`/habits/${habit.id}`, {
      method: "DELETE",
    }).then(() => onDeleteHabit(habit.id));
  }

  function handleSubmitProgress(e) {
    e.preventDefault();
    fetch(`/habits/${habit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: parseFloat(habit.progress) + parseFloat(progress),
      }),
    })
      .then((r) => r.json())
      .then((habit) => {
        updateHabits(habit);
      });
  }

  return (
    
    <div class="relative">
      <div class="border border-success text-lg text-center rounded-lg shadow-2xl">
        <h1>Name: {habit.name}</h1>
        <h1>Repeat: {habit.repeat}</h1>
        <h1>Goal: {habit.goal}</h1>
        <h1>Start date: {habit.start_date.substring(0, 10)}</h1>
        {/* <h1>Reminder: {moment(habit.riminders[0].time).format("HH:mm:ss")} </h1> */}
        <button class="btn btn-ghost" onClick={()=>setShowAlarm(!showAlarm)}>Reminder: {moment(habit.riminders[0].time).format("HH:mm:ss")}</button>

      </div>
      <div class="absolute top-1 right-1">
        <button class="btn btn-ghost" onClick={openProgressForm}>
          Add progress ⚡️
        </button>

        {show === true ? (
          <div>
            <form onSubmit={handleSubmitProgress}>
              <input
                className="input input-bordered border-success w-40 max-w-xs"
                type="number"
                min={0.1}
                step={0.1}
                key={habit.id}
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              ></input>
              <button type="submit" className="btn shadow-xl btn-success h-7">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <br></br>
        )}
        <button class="btn btn-ghost" onClick={handleDelete}>
          Quit habit ❌
        </button>
      </div>
      <div class="absolute top-7 left-24">
        <div
          className="radial-progress text-green-500"
          style={{
            "--value": (
              (habit.progress * 100) /
              parseFloat(habit.goal)
            ).toFixed(0),
          }}
        >
          {((habit.progress * 100) / parseFloat(habit.goal)).toFixed(0)}%
        </div>
      </div>
  
         {showAlarm === true ? <AlarmClock
            habit={habit}
            updateHabits={updateHabits}
            setShowAlarm={setShowAlarm}
            setTime={setTime}
            time={time}
         
          /> : null}
    </div>
  );
}

export default HabitCard;
