import React, { useState, useEffect } from 'react';

function Draft() {
    const [seconds, setSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (timerRunning) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        setTimerRunning(false);
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timerRunning]);

    const handleStart = () => {
        if (seconds > 0) {
            setTimerRunning(true);
        }
    };

    const handleReset = () => {
        setSeconds(0);
        setTimerRunning(false);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSeconds(parseInt(value) || 0);
    };

    return (
        <div>
            <input
                type="number"
                value={seconds}
                onChange={handleChange}
                disabled={timerRunning}
            />
            <button onClick={handleStart} disabled={timerRunning}>
                Start
            </button>
            <button onClick={handleReset}>Reset</button>
            <p>{timerRunning ? `Time remaining: ${seconds} seconds` : "Timer stopped"}</p>
        </div>
    );
}

export default Draft;
