import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function getAuthToken() {
  const cached = sessionStorage.getItem('resume_analyser_jwt')
  if (cached) return cached
  
  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: 'frontend-user' }),
  })
  if (!response.ok) throw new Error('Failed to authenticate with backend')
  const data = await response.json()
  sessionStorage.setItem('resume_analyser_jwt', data.token)
  return data.token
}

export function useRewrite() {
  const [isRewriting, setIsRewriting] = useState(false)
  const [rewriteError, setRewriteError] = useState('')

  const rewriteSection = async (sectionName, originalText, jobDescription, feedback) => {
    setIsRewriting(true)
    setRewriteError('')
    try {
      const token = await getAuthToken()
      const response = await fetch(`${API_BASE_URL}/rewrite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section_name: sectionName,
          original_text: originalText || 'Full resume context evaluated.',
          job_description: jobDescription,
          feedback: feedback,
        }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload?.error?.message || 'Rewrite failed')
      }

      return payload
    } catch (error) {
      setRewriteError(error.message)
      throw error
    } finally {
      setIsRewriting(false)
    }
  }

  return { rewriteSection, isRewriting, rewriteError }
}
