'use client'

import { useEffect, useState } from 'react'

export default function LoadingSpinner() {
  const [displayed, setDisplayed] = useState('')
  const text = 'Loading...'
  useEffect(() => {
    let i = 0
    setDisplayed('')
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="flex justify-center items-center py-20">
      <span className="text-xl font-mono tracking-widest text-primary">{displayed}</span>
    </div>
  )
} 