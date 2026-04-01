import { useContext } from 'react'
import { AnalysisContext } from '../context/AnalysisContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function getAuthToken() {
  const cached = sessionStorage.getItem('resume_analyser_jwt')
  if (cached) {
    return cached
  }

  const response = await fetch(`${API_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: 'frontend-user' }),
  })

  if (!response.ok) {
    throw new Error('Failed to authenticate with backend')
  }

  const data = await response.json()
  sessionStorage.setItem('resume_analyser_jwt', data.token)
  return data.token
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider')
  }

  const runAnalysis = async () => {
    if (!context.uploadedFile || !context.jobDescription.trim()) {
      throw new Error('Resume and job description are required')
    }

    context.setIsAnalysing(true)
    context.setAnalysisError('')

    try {
      const token = await getAuthToken()
      const formData = new FormData()
      formData.append('resume', context.uploadedFile)
      formData.append('job_description', context.jobDescription)

      const response = await fetch(`${API_BASE_URL}/analyse`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const payload = await response.json()

      if (!response.ok) {
        const message = payload?.error?.message || 'Analysis failed. Please try again.'
        throw new Error(message)
      }

      context.setAnalysisResult(payload)
      return payload
    } catch (error) {
      context.setAnalysisError(error.message || 'Unexpected analysis error')
      throw error
    } finally {
      context.setIsAnalysing(false)
    }
  }

  return {
    ...context,
    runAnalysis,
  }
}
