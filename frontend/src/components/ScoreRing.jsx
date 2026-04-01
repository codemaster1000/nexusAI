import { motion } from 'framer-motion'

function scoreTone(score) {
  if (score <= 40) return 'var(--critical)'
  if (score <= 70) return 'var(--warning)'
  return 'var(--positive)'
}

export function ScoreRing({ score }) {
  const tone = scoreTone(score)

  return (
    <motion.div
      className="score-ring"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      style={{ '--ring-tone': tone }}
    >
      <svg viewBox="0 0 120 120" className="score-ring-svg" role="img" aria-label={`Overall score ${score}`}>
        <circle className="score-ring-track" cx="60" cy="60" r="52" />
        <circle
          className="score-ring-progress"
          cx="60"
          cy="60"
          r="52"
          style={{ strokeDashoffset: `${327 - (327 * score) / 100}` }}
        />
      </svg>
      <div className="score-ring-label">
        <span>{score}</span>
        <small>Match</small>
      </div>
    </motion.div>
  )
}
