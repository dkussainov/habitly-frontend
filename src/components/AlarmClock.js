import React, { useState , useEffect} from 'react';

function AlarmClock() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!alarmTime || !alarmActive) {
      return;
    }

    const alarmInterval = setInterval(() => {
      if (time.getTime() === alarmTime.getTime()) {
        alert('Wake up!');
        setAlarmActive(false);
      }
    }, 1000);

    return () => clearInterval(alarmInterval);
  }, [time, alarmTime, alarmActive]);

  const handleAlarmTimeChange = event => {
    const value = event.target.value;
    const hours = value.split(':')[0];
    const minutes = value.split(':')[1];
    const newAlarmTime = new Date();
    newAlarmTime.setHours(hours);
    newAlarmTime.setMinutes(minutes);
    setAlarmTime(newAlarmTime);
  };

  const handleAlarmToggle = () => {
    setAlarmActive(prev => !prev);
  };

  return (
    <div>
      <p>Current time: {time.toLocaleTimeString()}</p>
      <label htmlFor="alarm-time">Alarm time:</label>
      <input
        type="time"
        id="alarm-time"
        value={alarmTime ? alarmTime.toLocaleTimeString() : ''}
        onChange={handleAlarmTimeChange}
      />
      <button onClick={handleAlarmToggle}>
        {alarmActive ? 'Deactivate Alarm' : 'Activate Alarm'}
      </button>
    </div>
  );
}

export default AlarmClock;