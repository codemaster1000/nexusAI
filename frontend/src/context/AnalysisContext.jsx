import { createContext, useMemo, useState } from 'react'

export const AnalysisContext = createContext(null)

const SESSION_JD_KEY = 'resume_analyser_job_description'

export function AnalysisProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [analysisError, setAnalysisError] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState(
    sessionStorage.getItem(SESSION_JD_KEY) || ''
  )

  const updateJobDescription = (value) => {
    setJobDescription(value)
    sessionStorage.setItem(SESSION_JD_KEY, value)
  }

  const value = useMemo(
    () => ({
      analysisResult,
      setAnalysisResult,
      isAnalysing,
      setIsAnalysing,
      analysisError,
      setAnalysisError,
      uploadedFile,
      setUploadedFile,
      jobDescription,
      updateJobDescription,
    }),
    [analysisResult, isAnalysing, analysisError, uploadedFile, jobDescription]
  )

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}
