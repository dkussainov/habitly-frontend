import React from 'react'

function HabitCard({habit, onDeleteHabit}) {

    function handleDelete() {
        fetch(`/habits/${habit.id}`, {
            method: 'DELETE'
        })
        .then(r=> r.json())
        .then(() => onDeleteHabit(habit.id))
    }


  return (
    <div>
    <div class="border border-success">
        <li>
        <h1>Name: {habit.name}</h1>
        <h1>Repeat: {habit.repeat}</h1>
        <h1>Goal: {habit.goal}</h1>
        <h1>Start date: {habit.start_date}</h1>
        <button class="btn btn-ghost">Add progress</button>
        <button class="btn btn-success" onClick={handleDelete} >Quit habit</button>
        </li>   
    </div>

    </div>
  )
}

export default HabitCard