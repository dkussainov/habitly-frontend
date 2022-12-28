import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [eye, setEye] = useState(false);
  function toggle() {
    setEye(!eye);
  }

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  console.log("loginForm:", form);

  const [errors, setErrors] = useState([]);
  console.log("Errors:", errors);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setForm({ ...form, [keyName]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => {
          setUser(currentUser);
        });
        navigate("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="flex justify-center text-center font-sans px-auto">
      <div className="artboard border-4 rounded-lg shadow-2xl shadow-current border-success  phone-1">
        <h1 class="text-success pt-28 font-inherit">LOG IN</h1>
        <form class="px-3" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text text-success">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered border-success w-full max-w-xs"
            value={form.username}
            onChange={handleChange}
            name="username"
          />

          <label className="label">
            <span className="label-text text-success">Password</span>
          </label>
          <div className="relative">
            <div className="w-full">
              <input
                type={eye === false ? "password" : "text"}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs border-success"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="text 2xl absolute top-4 right-5 cursor-pointer">
              {eye === false ? (
                <AiFillEyeInvisible onClick={toggle} />
              ) : (
                <AiFillEye onClick={toggle} />
              )}
            </div>
          </div>
          <Link to="/signup" class="link link-primary ">
            Dont have an account? Sign Up
          </Link>

          <div class="italic ml-3 pb-3 text-red-600">
            {errors.map((e) => `${e}. `)}
          </div>
          <button
            type="submit"
            className="btn shadow-xl flex btn-success"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
