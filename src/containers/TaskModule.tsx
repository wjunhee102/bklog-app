import React, { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';

function TaskModule() {
  const timeout = 3000
  const [remaining, setRemaining] = useState(timeout)
  const [elapsed, setElapsed] = useState(0)
  const [lastActive, setLastActive] = useState(+new Date())
  const [isIdle, setIsIdle] = useState(false)

  const handleOnActive = () => setIsIdle(false)
  const handleOnIdle = () => setIsIdle(true)

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  })

  const handleReset = () => reset()
  const handlePause = () => pause()
  const handleResume = () => resume()

  useEffect(() => {
    setRemaining(getRemainingTime())
    setLastActive(getLastActiveTime())
    setElapsed(getElapsedTime())

    setInterval(() => {
      setRemaining(getRemainingTime())
      setLastActive(getLastActiveTime())
      setElapsed(getElapsedTime())
    }, 1000)
  }, [])

  return (
    <div>
      <div>
        <h1>Timeout: {timeout}ms</h1>
        <h1>Time Remaining: {remaining}</h1>
        <h1>Time Elapsed: {elapsed}</h1>
        <h1>Last Active: {lastActive}</h1>
        <h1>Idle: {isIdle.toString()}</h1>
      </div>
      <div>
        <button onClick={handleReset}>RESET</button>
        <button onClick={handlePause}>PAUSE</button>
        <button onClick={handleResume}>RESUME</button>
      </div>
    </div>
  )
}

export default TaskModule;