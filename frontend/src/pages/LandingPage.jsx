import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-8 max-w-4xl leading-[1.1]"
          >
            Elevate your hiring with AI-powered <span className="text-primary">resume analysis</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed"
          >
            Transform your recruitment pipeline from a spreadsheet into an editorial masterpiece. Analyze skill gaps, map career trajectories, and hire with absolute confidence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link to="/upload" className="primary-gradient text-on-primary px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-150">
              Get Started
            </Link>
            <Link to="/results" className="glass-panel text-on-surface px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/60 transition-all">
              View Demo
            </Link>
          </motion.div>

          {/* Bento Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 grid grid-cols-12 gap-6 w-full max-w-6xl"
          >
            <div className="col-span-12 md:col-span-8 h-[400px] rounded-[2.5rem] overflow-hidden editorial-shadow glass-panel relative group border-white/40">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Dashboard showing candidate profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcLP2aPZo29aEWzDUMFJJhn2IQQ47X5sP2iHlNayQVIp4M-ihmi_WTa7_fnL_B7uShihLyiRak9VM8fZ9KJKP6FqNjArO4eGUflfNt53FXc4zUP92yg3dv5P7pEnguubTQE2KuF5wGYkWimi0BlJQawbzdpTyQnGUeZzQ9P4hjgiQ8GB2XS_KTqzEnptAt4i6KhkP7syg9774OLE4KZ7raBBW9SbNSJv1AZKeHuJXzmGX918wCKM2FhyF9bU--sfvWD_7V2_rcIco"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white text-left">
                <span className="font-headline text-2xl font-bold">Intelligent Scoring</span>
                <p className="font-body text-sm opacity-90">Deep-learning analysis of candidate potential.</p>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4 h-[400px] rounded-[2.5rem] overflow-hidden editorial-shadow glass-panel flex flex-col justify-center p-8 text-left border border-white/40">
              <div className="h-12 w-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary" data-icon="description">description</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Semantic Reading</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">Our AI doesn't just scan keywords; it understands context, tenure, and impact within professional narratives.</p>
              
              <div className="mt-8 pt-8 border-t border-emerald-100/40 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white/60 bg-primary-fixed/80 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white/60 bg-secondary-fixed/80 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm">AM</div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant font-label">+500 Analysts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">Precision in every profile.</h2>
                <p className="font-body text-on-surface-variant text-lg leading-relaxed">We provide a premium, digital publication feel to candidate data. Move beyond the chaos of manual screening.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 rounded-2xl transition-all hover:bg-white/30">
                  <div className="bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">Skill Gap Analysis</h4>
                    <p className="font-body text-sm text-on-surface-variant">Identify exactly where a candidate fits or falls short in your current ecosystem.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-4 rounded-2xl transition-all hover:bg-white/30">
                  <div className="bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary" data-icon="route">route</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">Career Path Mapping</h4>
                    <p className="font-body text-sm text-on-surface-variant">Predict the trajectory and long-term retention of talent with AI foresight.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asymmetric Card Layout */}
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl"></div>
              
              <div className="glass-panel rounded-[2.5rem] p-8 editorial-shadow border border-white/50 space-y-6 relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-emerald-100/40">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50/50 overflow-hidden border border-white/40">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="Profile" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoxWWVTKX_nmZ_3jRvyA9j8McPpmkGwPdOAnlqJDYdPoOFyoysn7BXEOE-DXt9G7jLVt0DBCgnA4Xuv_NBfDy5YNLK5T9m5ur-RaSl_2f6cD-mNFupqjMUficZ3WU_h46XLIjR6YYvyinOPFbIS1yyK_ku1otzl7kANsp88GAwQNy85UZ_xCTryFwrNf4zJTBmftoNE4J6w-34vXxHPnysUkEJZ03oapU1ovrP9JO9b0uAogpJT3yaqdsOM6QesJuH2LDG9b4KWiE"
                      />
                    </div>
                    <div>
                      <div className="font-headline font-bold">Jonathan Sterling</div>
                      <div className="font-label text-xs text-on-surface-variant">Senior Editorial Lead</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline text-2xl font-extrabold text-primary">94%</span>
                    <span className="font-label text-[10px] text-primary font-bold">MATCH</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-2 w-full bg-emerald-100/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '94%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-primary-container rounded-full"
                    ></motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40">
                      <div className="font-label text-[10px] text-on-surface-variant mb-1 uppercase font-bold tracking-widest">Experience</div>
                      <div className="font-headline font-bold text-lg text-primary">12 Years</div>
                    </div>
                    <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white/40">
                      <div className="font-label text-[10px] text-on-surface-variant mb-1 uppercase font-bold tracking-widest">Growth Pot.</div>
                      <div className="font-headline font-bold text-lg text-primary">High</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Insight */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-10 -right-6 glass-panel rounded-2xl p-5 editorial-shadow border border-white/60 bg-primary-container/30 backdrop-blur-xl max-w-[200px] z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-on-primary-container text-sm" data-icon="lightbulb">lightbulb</span>
                  <span className="font-headline text-xs font-bold text-on-primary-container uppercase tracking-tight">AI Insight</span>
                </div>
                <p className="font-body text-[11px] text-on-primary-container leading-relaxed italic">"Sterling demonstrates exceptional leadership in high-density editorial workflows."</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
              <span className="font-label text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Trusted by industry titans</span>
              <h2 className="font-headline text-4xl font-extrabold text-on-surface leading-tight">Quantifying the human element.</h2>
            </div>
            <div className="text-right">
              <span className="font-headline text-6xl font-extrabold text-primary block leading-none">4.2M</span>
              <span className="font-label text-on-surface-variant text-sm font-medium">Resumes Analyzed Weekly</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="h-12 flex items-center justify-center font-headline font-black text-xl tracking-tighter italic">FORBES</div>
            <div className="h-12 flex items-center justify-center font-headline font-black text-xl tracking-tighter italic">ADWEEK</div>
            <div className="h-12 flex items-center justify-center font-headline font-black text-xl tracking-tighter italic">HARVARD</div>
            <div className="h-12 flex items-center justify-center font-headline font-black text-xl tracking-tighter italic">WIRED</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-panel !bg-emerald-900/10 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-emerald-950 mb-8 leading-tight">Ready to refine your talent acquisition?</h2>
            <p className="font-body text-emerald-900/70 text-lg mb-12 max-w-xl">Join the league of editorial-minded recruiters who value depth, clarity, and precision.</p>
            <Link to="/upload" className="primary-gradient text-on-primary px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-all active:scale-95 inline-block">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
