// Doctors.jsx
import React, { useEffect } from 'react'
import TopDoctors from './TopDoctors'

const Doctors = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Page ke top par le jane ke liye
  }, []);

  return (
    <div className="pt-20"> {/* Navbar ke niche space dene ke liye padding */}
      <TopDoctors />
    </div>
  )
}

export default Doctors