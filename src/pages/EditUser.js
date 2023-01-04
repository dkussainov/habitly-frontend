
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function EditUser(props) {
  const [userForm, setUserForm] = useState({});
  // console.log("UserEditForm:", userForm);

  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setUserForm({ ...userForm, [keyName]: value });
  }

  function handleEditUser(e) {
    e.preventDefault();
    fetch(`/users/${props.user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedUser) => {
          props.setUser(updatedUser);
        });
        navigate("/");
      } else {
        r.json().then((err) => console.log(err.errors));
      }
    });
  }

  return props.trigger ? (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div bg-white p-2 rounded w-72>
        <h1 className="font-semibold text-center text-xl text-gray-700" >Edit Profile</h1>
      <form onSubmit={handleEditUser} className="flex flex-col">
        <label className="text-center text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={userForm.username}
          onChange={handleChange}
          className="border border-gray-700 p-2 rounded mb-5"
        />
        <label className="text-center text-gray-700">Email</label>
        <input
          type="text"
          name="email"
          value={userForm.email}
          onChange={handleChange}
          className="border border-gray-700 p-2 rounded mb-5"
        />
        <label className="text-center text-gray-700">Picture</label>
        <input type="file" name="profile_picture" className="border border-gray-700 p-2 rounded mb-5" value={userForm.profile_picture} onChange={handleChange}/>
        <button type="submit" className="px-5 py-2 bg-gray-700 text-white rounded">Submit</button>
      </form>
      <div className="">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => props.setEditButton(false)}
        >
          Close
        </button>
        {props.children}
      </div>

      </div>
    </div>
  ) : (
    ""
  );
}

export default EditUser;
