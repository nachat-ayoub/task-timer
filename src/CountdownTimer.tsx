import React, { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
  taskMessage: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes,
  taskMessage,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let startTime = parseInt(localStorage.getItem('startTime') || '0', 10);
    const currentTime = Math.floor(Date.now() / 1000);

    if (startTime === 0) {
      // No start time stored, set it to now
      startTime = currentTime;
      localStorage.setItem('startTime', startTime.toString());
    }

    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(initialMinutes * 60 - elapsedTime, 0);
    setTimeLeft(remainingTime);

    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Hide loading spinner
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [initialMinutes]);

  useEffect(() => {
    if (timeLeft <= 0) {
      playEndSound();
      return;
    }

    if (!isPaused) {
      intervalIdRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalIdRef.current!);
            playEndSound();
          }

          document.title = `${formatTime(newTime)} | ${taskMessage}`;
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalIdRef.current!);
  }, [timeLeft, isPaused]);

  const resetTimer = () => {
    const newStartTime = Math.floor(Date.now() / 1000);
    localStorage.setItem('startTime', newStartTime.toString());
    setTimeLeft(initialMinutes * 60);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const playEndSound = () => {
    document.title = `Finished! | ${taskMessage}`;
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-10 h-10 text-gray-500 animate-spin fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className='text-3xl font-bold'>{taskMessage}</h1>
          <div className='my-6 font-bold text-7xl'>{formatTime(timeLeft)}</div>
          <div className='flex space-x-4'>
            <button
              onClick={resetTimer}
              className='px-6 py-3 text-base font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            >
              Reset Timer
            </button>
            <button
              className='px-6 py-3 text-base font-bold text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-yellow-800'
              disabled={timeLeft <= 0}
              onClick={togglePause}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </>
      )}
      <audio
        ref={audioRef}
        src='https://pomofocus.io/audios/alarms/alarm-digital.mp3'
      />
    </div>
  );
};

export default CountdownTimer;
