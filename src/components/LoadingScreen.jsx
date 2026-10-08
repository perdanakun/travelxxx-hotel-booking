'use client'

import styles from './LoadingScreen.module.css'

/**
 * Minimal loading indicator, retaining the existing LoadingScreen API.
 * Props passed by existing screens are intentionally ignored visually.
 */
export default function LoadingScreen() {
  return (
    <main
      className={styles.screen}
      role="status"
      aria-label="Loading TravelXXX"
      aria-live="off"
      aria-busy="true"
    >
      {/* Single 18px bouncing dot, centered in the viewport. */}
      <div className={styles.dotMotion} aria-hidden="true">
        <span className={styles.dot} />
      </div>
    </main>
  )
}
