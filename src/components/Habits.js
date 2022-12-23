
import { FaHandHoldingWater } from "react-icons/fa";
import { GiMeditation, GiBodyBalance } from "react-icons/gi";
import { BsWind } from "react-icons/bs";
import { ImSleepy } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FcPlus } from "react-icons/fc";

function Habits({ user }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/new-habit");
  }

  return (
    <div class="grid h-1/2 place-items-center">
      <h2 style={{ marginBottom: "2%", marginTop: "2%" }}>Good to see you! </h2>
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <FaHandHoldingWater style={{ marginLeft: "1%" }} />
            Drink water
          </button>
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <GiMeditation style={{ marginLeft: "1%" }} />
            <h3>Meditate</h3>
          </button>
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <BsWind style={{ marginLeft: "1%" }} />
            <h3>Deep breath</h3>
          </button>
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <GiBodyBalance style={{ marginLeft: "1%" }} />
            <h3>Quick Stretch</h3>
          </button>
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <ImSleepy style={{ marginLeft: "1%" }} />
            <h3>Take Power Naps</h3>
          </button>
        </div>
        <div>
          <button className="btn btn-active btn-ghost" onClick={handleClick}>
            <FcPlus style={{ marginLeft: "1%" }} />
            <h3>Create New Habit</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Habits;
