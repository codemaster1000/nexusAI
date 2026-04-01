import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'

const LandingPage = lazy(() => import('./pages/LandingPage').then((module) => ({ default: module.LandingPage })))
const UploadPage = lazy(() => import('./pages/UploadPage').then((module) => ({ default: module.UploadPage })))
const ResultsPage = lazy(() => import('./pages/ResultsPage').then((module) => ({ default: module.ResultsPage })))

function PageLoader() {
  return <div className="card muted">Loading page...</div>
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/upload"
          element={
            <Suspense fallback={<PageLoader />}>
              <UploadPage />
            </Suspense>
          }
        />
        <Route
          path="/results"
          element={
            <Suspense fallback={<PageLoader />}>
              <ResultsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
