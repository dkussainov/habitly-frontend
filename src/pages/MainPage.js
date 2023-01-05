import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import moment from "moment";

import ToDoList from "../components/ToDoList";
import HabitCard from "../components/HabitCard";
import NewHabit from "./NewHabit";
import { FcPlus } from "react-icons/fc";

function MainPage({ user, setUser }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setShow(!show);
  }

  const [time, setTime] = useState(new Date().toLocaleTimeString("it-IT"));
  console.log("Time:", time);

  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString("it-IT"));
  }, 1000);

  const [habitsArray, setHabitsArray] = useState([]);
  // console.log("HABITS ARRAY:", habitsArray);

  useEffect(() => {
    fetch(`/users/${user.id}/habits`)
      .then((r) => r.json())
      .then(setHabitsArray);
  }, []);

  function updateHabits(updatedHabit) {
    const updatedHabits = habitsArray.map((habit) => {
      if (habit.id === updatedHabit.id) {
        return updatedHabit;
      } else {
        return habit;
      }
    });
    setHabitsArray(updatedHabits);
  }

  function onDeleteHabit(deletedHabit) {
    const updateDelete = habitsArray.filter(
      (habit) => habit.id !== deletedHabit
    );
    setHabitsArray(updateDelete);
  }

  function addHabit(newHabit) {
    setHabitsArray([...habitsArray, newHabit]);
  }

  return (
    <div>
      <div class="flex-1">
        <div class="my-8 mx-6 p-4">
          <ProfileCard user={user} setUser={setUser} />
        </div>

        <div class="flex justify-center">
          <button
            className="btn btn-active btn-ghost w-1/3"
            onClick={handleClick}
          >
            <FcPlus style={{ marginLeft: "1%" }} />
            <h3 style={{ marginLeft: "1%" }} class="text-green-700">Create New Habit</h3>
            <h3 style={{ marginLeft: "1%" }} class="text-blue-600" >{time.substring(0, 5)}</h3>
          </button>
        </div>
        
      </div>

      <br></br>

      <div class="flex justify-center">
        {show === true ? (
          <NewHabit addHabit={addHabit} setShow={setShow} show={show} />
        ) : (
          <br></br>
        )}
      </div>
      <br></br>
      <div class="">
        <div class="flex flex-col gap-6 w-2/4 justify-center float-left p-10">
          {habitsArray.map((habit) => (
            <HabitCard
              habit={habit}
              key={habit.id}
              onDeleteHabit={onDeleteHabit}
              updateHabits={updateHabits}
              setTime={setTime}
              time={time}
            />
          ))}
        </div>
        <div class="flex flex-col gap-6 w-2/4 justify-center p-10">
          <ToDoList user={user} setUser={setUser} time={time} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
