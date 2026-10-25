import React from 'react'
import styles from '../KinProperty.module.css'

export default function PhoneMockup({ className = '', children }) {
  return (
    <div className={`${styles.s24UltraDevice} ${className}`}>
      {/* S24 Ultra Centered Punch-Hole Camera */}
      <div className={styles.s24PunchHole} />
      {children}
    </div>
  )
}
