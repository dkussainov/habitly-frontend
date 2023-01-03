import EditUser from "../pages/EditUser";
import { useState } from "react";


function ProfileCard({ user, setUser }) {
  const [editButton, setEditButton] = useState(false);


  return (
    <div>
      <div className="card w-60 card-flex bg-slate-200 border-success border-2 pt-5 object-center shadow-2xl">
        <div className="avatar justify-center">
          <div className="w-24 rounded-full border-2 shadow-2xl border-yellow-500">
            <img src={user.picture} alt={user.username} />
          </div>
        </div>

        <div className="card-body items-center  text-center">
          <h2 className="card-title flex-auto">{user.username}</h2>
          <p class="italic">{user.email}</p>
          <div className="card-actions">
            <button
              className="btn btn-success flex-auto shadow-2xl text-yellow-500"
              onClick={() => setEditButton(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <EditUser
          trigger={editButton}
          setEditButton={setEditButton}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
