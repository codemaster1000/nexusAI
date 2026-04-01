import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnalysis } from '../hooks/useAnalysis'

const MAX_FILE_BYTES = 5 * 1024 * 1024

export function UploadPage() {
  const {
    uploadedFile,
    setUploadedFile,
    jobDescription,
    updateJobDescription,
    runAnalysis,
    analysisError,
    isAnalysing,
  } = useAnalysis()
  const navigate = useNavigate()

  const charCount = jobDescription.length
  const isJobDescriptionValid = charCount >= 100 && charCount <= 5000
  const canAnalyse = Boolean(uploadedFile) && isJobDescriptionValid && !isAnalysing

  const onDrop = (acceptedFiles, rejections) => {
    if (rejections.length > 0) {
      return
    }

    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_BYTES,
    accept: { 'application/pdf': ['.pdf'] },
  })

  const fileSizeText = useMemo(() => {
    if (!uploadedFile) return ''
    return `${(uploadedFile.size / 1024).toFixed(1)} KB`
  }, [uploadedFile])

  const handleAnalyse = async () => {
    try {
      await runAnalysis()
      navigate('/results')
    } catch (_error) {
      // Error is surfaced through analysisError state.
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-8 py-12 md:py-20 lg:py-24">
        {/* Hero Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-emerald-950 tracking-tight mb-6">
            The Nexus Analyzer
          </h1>
          <p className="font-body text-xl text-emerald-800/80 max-w-2xl mx-auto leading-relaxed">
            Refine your professional narrative. Match your potential against industry-leading benchmarks using our high-fidelity AI engine.
          </p>
        </motion.div>

        {/* Upload Grid */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Resume PDF Drop Zone */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-5 h-[450px]"
          >
            <div 
              {...getRootProps()}
              className={`h-full glass-panel rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center transition-all group cursor-pointer shadow-sm border-2 border-dashed ${isDragActive ? 'border-emerald-500 bg-white/70' : 'border-emerald-200/50 hover:bg-white/60 hover:border-emerald-300'}`}
              role="button"
              aria-label="Upload resume PDF"
            >
              <input {...getInputProps()} />
              
              <AnimatePresence mode="wait">
                {!uploadedFile ? (
                  <motion.div 
                    key="upload-prompt"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                      <span className="material-symbols-outlined text-5xl text-emerald-700" data-icon="upload">upload</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-emerald-900 mb-3">Upload Resume</h3>
                    <p className="font-body text-base text-emerald-800/60 mb-8">Drop your PDF here (max 5MB)</p>
                    <div className="px-8 py-3 bg-emerald-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors shadow-lg">
                      Browse Files
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="file-info"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                      <span className="material-symbols-outlined text-4xl text-emerald-700" data-icon="description">description</span>
                    </div>
                    <h3 className="font-headline text-xl font-bold text-emerald-900 mb-2 truncate w-full px-4" title={uploadedFile.name}>
                      {uploadedFile.name}
                    </h3>
                    <p className="font-body text-emerald-800/60 font-medium mb-6">{fileSizeText}</p>
                    <div className="px-6 py-2 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                      Replace File
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Job Description Text Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-7 h-[450px]"
          >
            <div className="h-full glass-panel rounded-[2.5rem] p-10 flex flex-col shadow-sm border border-white/40">
              <div className="flex items-center justify-between mb-6 px-2">
                <label className="font-headline font-bold text-emerald-900 text-xl">Job Description</label>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800/60 bg-white/40 px-3 py-1 rounded-full border border-white/60">
                  Compatibility Target
                </span>
              </div>
              
              <textarea 
                value={jobDescription}
                onChange={(event) => updateJobDescription(event.target.value)}
                className="flex-1 w-full bg-white/50 border-emerald-100 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 rounded-3xl p-8 font-body text-emerald-900 placeholder:text-emerald-900/40 resize-none leading-relaxed transition-all shadow-inner" 
                placeholder="Paste the job description here to analyze professional compatibility benchmarks... (minimum 100 characters)"
              />
              
              <div className="flex justify-end mt-4 px-2">
                <span className={`text-sm font-semibold transition-colors ${
                  charCount === 0 ? 'text-emerald-800/40' : 
                  isJobDescriptionValid ? 'text-emerald-700' : 
                  'text-amber-600'
                }`}>
                  {charCount}/5000 characters {charCount > 0 && !isJobDescriptionValid && '(min 100)'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Action Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 flex flex-col items-center mt-12"
          >
            <button 
              disabled={!canAnalyse}
              onClick={handleAnalyse}
              className={`group relative px-12 md:px-16 py-5 md:py-6 rounded-full text-white font-headline text-xl md:text-2xl font-bold flex items-center gap-4 transition-all duration-300
                ${canAnalyse 
                  ? 'primary-gradient shadow-2xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-1 active:translate-y-0 active:scale-95' 
                  : 'bg-emerald-200 cursor-not-allowed opacity-70'
                }`}
            >
              <span>{isAnalysing ? 'Analysing Professional Match...' : 'Analyse Professional Match'}</span>
              {!isAnalysing && (
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
              )}
            </button>
            
            <AnimatePresence>
              {analysisError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-red-600 font-semibold bg-red-50 px-6 py-3 rounded-xl shadow-sm border border-red-100"
                >
                  {analysisError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  )
}
