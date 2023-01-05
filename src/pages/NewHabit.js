import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewHabit({ addHabit, setShow, show}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    repeat: "Monday",
    goal: "1",
    times: "times",
    per: "per day",
    start_date: "",
  });
  // console.log(formData);
  // console.log(addHabit);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setFormData({ ...formData, [keyName]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        repeat: formData.repeat,
        goal: `${formData.goal} ${formData.times} ${formData.per}`,
        start_date: formData.start_date,
      }),
    })
      .then((r) => r.json())
      .then((habit) => {
        // addHabitHandler()
        addHabit(habit);
        setShow(!show);
      });
  }

  return (
    <div class="flex justify-center border border-success text-lg text-start w-1/3 rounded-lg shadow-2xl">
      <form onSubmit={handleSubmit}>
        <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-blue-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Habit name"
          value={formData.name}
          onChange={handleChange}
          class='border border-success w-full'
        ></input>
        <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-blue-700">Repeat</label>
        <select value={formData.repeat} name="repeat" onChange={handleChange} class='border border-success w-full'>
          <option value="Every Day">Every Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-blue-700">Goal</label>
        <input
          type="number"
          min={0.1}
          step={0.1}
          name="goal"
          placeholder="Select number"
          value={formData.number}
          onChange={handleChange}
          class='border border-success'
        />
        <select value={formData.times} name="times" onChange={handleChange} class='border border-success'>
          <option value="times">times</option>
          <option value="min">min</option>
          <option value="hours">hours</option>
          <option value="steps">steps</option>
          <option value="kg">kg</option>
          <option value="grams">grams</option>
          <option value="mg">mg</option>
          <option value="oz">oz</option>
          <option value="pounds">pounds</option>
          <option value="liters">liters</option>
          <option value="mL">mL</option>
          <option value="fl oz">fl oz</option>
          <option value="cups">cups</option>
          <option value="kilojoule">kilojoule</option>
          <option value="cal">cal</option>
          <option value="kcal">kcal</option>
          <option value="joules">joules</option>
          <option value="km">km</option>
          <option value="meters">meters</option>
          <option value="feet">feet</option>
          <option value="yerds">yards</option>
          <option value="miles">miles</option>
        </select>
        <select value={formData.per} name="per" onChange={handleChange} class='border border-success'>
          <option value="per day">per day</option>
          <option value="per week">per week</option>
          <option value="per month">per month</option>
        </select>
        <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-blue-700">Start Date</label>
        <DateTimePicker
          placeholder="Choose the date and time"
          name="date"
          type="date"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e })}
        />
        <button class="bg-blue-500 rounded py-1 px-3 text-white font-bold" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewHabit;
