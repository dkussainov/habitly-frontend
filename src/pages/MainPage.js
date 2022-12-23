import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Habits from "../components/Habits";
import ToDoList from "../components/ToDoList";
import HabitCard from "../components/HabitCard";
import NewHabit from "./NewHabit";

function MainPage({ user }) {

  const [habitsArray, setHabitsArray] = useState([])
  console.log("HABITS ARRAY:", habitsArray)

  useEffect(() => {
    fetch(`/users/${user.id}/habits`)
    .then(r => r.json())
    .then(setHabitsArray)

  },[])




  function onDeleteHabit(deletedHabit) {
    const updateDelete = habitsArray.filter(habit => habit.id !== deletedHabit)
    setHabitsArray(updateDelete)
  }


  function addHabit(newHabit) {
    console.log("in add Habit function")
    setHabitsArray([...habitsArray, newHabit])
  }
 

  return (

    <div>
      <div class="relative h-96 ">
        <div class="absolute inset-y-0 left-5 w-1/2 ">
          <ProfileCard user={user} />
        </div>
        <div class="flex justify-end inset-0">
          <Habits />
        </div>
      </div>
      <NewHabit addHabit={addHabit}/>
      {/* <Routes>

        <Route path="/new-habit" element={<NewHabit addHabit={addHabit} />} /> 
      </Routes> */}
      <ul class="grid grid-rows-4 grid-flow-col gap-4">
      {habitsArray.map(habit => <HabitCard habit={habit} key={habit.id} onDeleteHabit={onDeleteHabit}/>)}
      </ul>
      <div>
        <ToDoList />
      </div>
    </div>
  );
}

export default MainPage;
