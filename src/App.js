import NavBar from "./components/NavBar";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";

import EditUser from "./pages/EditUser";
import NewHabit from "./pages/NewHabit";
import ProfileCard from "./components/ProfileCard";
import ToDoList from "./components/ToDoList";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  console.log("Current user:", user);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => {
          setUser(currentUser);
        });
      }
    });
  }, []);

  function handleClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);

        navigate("/login");
      }
    });
  }

  if (user === null) {
    <h1>loading...</h1>;
  }

  return (
    <div
      style={{

      }}
    >
      <div class="flex-auto">
        <div className="navbar">
          <div className="navbar-start ">
            <a className="btn btn-ghost normal-case text-xl">
              {user ? (
                <Link to="/" className="logo text-success">
                  Habitly
                </Link>
              ) : (
                <Link className="logo text-success" to="/login">
                  Habitly
                </Link>
              )}
            </a>
          </div>
          <div>{/* <NavBar /> */}</div>
          <div className="navbar-end">
            <button
              onClick={handleClick}
              className="btn btn-outline btn-success"
            >
              {user ? (
                <div>
                  <button>Logout</button>
                </div>
              ) : (
                <button>Log In</button>
              )}
            </button>
          </div>
        </div>
        <div>
          {/* {user ? <NavBar /> : <></>} */}
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            {user ? (
              <Route
                path="/"
                element={<MainPage setUser={setUser} user={user} />}
              />
            ) : (
              <Route path="/login" element={<Login setUser={setUser} />} />
            )}

            <Route path="/user/edit" element={<EditUser />} />
            <Route
              path="/profile"
              element={<ProfileCard user={user} setUser={setUser} />}
            />
            <Route
              path="/todos"
              element={<ToDoList user={user} setUser={setUser} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
