import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Signup({ setUser }) {
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  function toggle2() {
    setEye2(!eye2);
  }
  function toggle() {
    setEye(!eye);
  }

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  console.log("Signup form:", form);

  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setForm({ ...form, [keyName]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newUser) => setUser(newUser));
        navigate("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="flex justify-center text-center font-sans px-auto">
      <div className="artboard border-4 rounded-lg shadow-2xl shadow-current border-success phone-1">
        <h1 class="text-success pt-16 font-inherit">SIGN UP</h1>
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
            <span className="label-text text-success">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered border-success w-full max-w-xs"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <label className="label">
            <span className="label-text text-success">Password</span>
          </label>
          <div className="relative">
            <div className="w-full">
              <input
                type={eye === false ? "password" : "text"}
                placeholder="Password"
                className="input input-bordered border-success w-full max-w-xs"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div className="text 2xl absolute top-4 right-5">
              {eye === false ? (
                <AiFillEyeInvisible onClick={toggle} />
              ) : (
                <AiFillEye onClick={toggle} />
              )}
            </div>
          </div>
          <label className="label">
            <span className="label-text text-success">
              Password confirmation
            </span>
          </label>
          <div className="relative">
            <div className="w-full">
              <input
                type={eye2 === false ? "password" : "text"}
                placeholder="Password Confirmation"
                className="input input-bordered border-success w-full max-w-xs"
                value={form.passwordConfirmation}
                onChange={handleChange}
                name="passwordConfirmation"
              />
            </div>
            <div className="text 2xl absolute top-4 right-5">
              {eye2 === false ? (
                <AiFillEyeInvisible onClick={toggle2} />
              ) : (
                <AiFillEye onClick={toggle2} />
              )}
            </div>
          </div>

          <Link to="/login" class="link link-primary">
            Have an account? Log In
          </Link>

          <button
            type="submit"
            className="btn shadow-xl flex btn-success"
          >
            Sign Up
          </button>
        <div class="italic ml-3 pb-3 text-red-600">
          {errors.map((e) => `${e}. `)}
        </div>
        </form>

      </div>
    </div>
  );
}

export default Signup;
