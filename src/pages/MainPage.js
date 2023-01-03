import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";

import ToDoList from "../components/ToDoList";
import HabitCard from "../components/HabitCard";
import NewHabit from "./NewHabit";
import AlarmClock from "../components/AlarmClock";
import { FcPlus } from "react-icons/fc";

function MainPage({ user, setUser }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setShow(!show);
  }

  const [habitsArray, setHabitsArray] = useState([]);
  console.log("HABITS ARRAY:", habitsArray);

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
    console.log("in add Habit function");
    setHabitsArray([...habitsArray, newHabit]);
  }

  return (
    <div>
      <div class="flex-1">
        <div class="my-8 mx-6 ">
          <ProfileCard user={user} setUser={setUser} />
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <FcPlus style={{ marginLeft: "1%" }} />
            <h3>Create New Habit</h3>
          </button>
        </div>
      </div>
      {show === true ? <NewHabit addHabit={addHabit} /> : <br></br>}

      <div>
        <div class="grid grid-rows gap-4 mx-6 w-1/2">
          {habitsArray.map((habit) => (
            <HabitCard
              habit={habit}
              key={habit.id}
              onDeleteHabit={onDeleteHabit}
              updateHabits={updateHabits}
            />
          ))}
        </div>
        <div>
          <ToDoList />
        </div>
        <AlarmClock />
      </div>
    </div>
  );
}

export default MainPage;
