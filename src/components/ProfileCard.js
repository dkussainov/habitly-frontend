import EditUser from "../pages/EditUser";
import { useState } from "react";


function ProfileCard({ user, setUser }) {
  const [editButton, setEditButton] = useState(false);


  return (
    <div>
      <div className="card w-80 h-20 card-flex bg-slate-200 border-blue-500 border-2 pt-5 object-center shadow-2xl relative">
        <div className="avatar justify-start left-6 bottom-2">
          <div className="w-12 rounded-full border-2 shadow-2xl border-emerald-500">
            <img src={user.picture} alt={user.username} />
          </div>
        </div>

        <div className="absolute top-1 right-24 card-body text-center items-center">
          <h2 className="absolute top-1 card-title flex-auto">{user.username}</h2>
          <p class="absolute italic">{user.email}</p>
          <div className="card-actions">
            <button
            class="absolute top-1 left-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
