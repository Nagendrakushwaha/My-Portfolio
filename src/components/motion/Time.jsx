import { useEffect, useState } from 'react'

export function Time() {
  const formatTime = () =>
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date())

  const [time, setTime] = useState(formatTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <span className="giats-live-time" title="Local Time in Bhopal, Madhya Pradesh, India (IST)">
      <span className="live-clock-dot" />
      <span className="live-clock-text">{time} IST</span>
    </span>
  )
}
