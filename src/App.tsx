import React, { useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';

const App: React.FC = () => {
  const [minutes, setMinutes] = useState(30); // Default 30 minutes
  const [taskMessage, setTaskMessage] = useState('Countdown Timer');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMinutes = params.get('minutes');
    const urlTask = params.get('task');

    const storedMinutes = localStorage.getItem('minutes');
    const storedStartTime = localStorage.getItem('startTime');
    const currentTime = Math.floor(Date.now() / 1000);

    let newMinutes: number;

    if (storedStartTime && storedMinutes) {
      const startTime = parseInt(storedStartTime, 10);
      const minutesFromStorage = parseInt(storedMinutes, 10);
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= minutesFromStorage * 60) {
        // Timer has ended, reset the timer
        localStorage.setItem('startTime', currentTime.toString());
        newMinutes = minutesFromStorage;
      } else {
        // Timer is still running, use the stored values
        newMinutes = minutesFromStorage;
      }
    } else {
      // No stored start time or minutes, use default or URL values
      if (urlMinutes) {
        newMinutes = parseInt(urlMinutes, 10);
        if (newMinutes !== parseInt(storedMinutes || '0', 10)) {
          // If URL minutes are different from stored, update localStorage and reset start time
          localStorage.setItem('minutes', newMinutes.toString());
          localStorage.removeItem('startTime'); // Remove the old start time
        }
      } else if (storedMinutes) {
        newMinutes = parseInt(storedMinutes, 10);
      } else {
        newMinutes = 30; // Default value
        localStorage.setItem('minutes', newMinutes.toString());
      }
      // Reset start time if the timer is not already running
      localStorage.setItem('startTime', currentTime.toString());
    }

    setMinutes(newMinutes);

    if (urlTask) {
      setTaskMessage(urlTask);
      localStorage.setItem('task', urlTask);
    } else {
      const storedTask = localStorage.getItem('task');
      if (storedTask) {
        setTaskMessage(storedTask);
      }
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen p-6 overflow-hidden'>
      <CountdownTimer initialMinutes={minutes} taskMessage={taskMessage} />
    </div>
  );
};

export default App;
