import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload Resume' },
  { to: '/results', label: 'AI powered Insights' },
]

export function AppLayout() {
  const location = useLocation()
  
  // Condially render footer based on current path if needed
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen soft-bg-gradient font-body text-on-surface selection:bg-primary-container/30 selection:text-on-primary-container">
      <header className="fixed top-0 left-0 right-0 h-20 z-50 glass-panel !border-b !border-emerald-100/50">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-emerald-900 font-headline">
              NexusAI
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-body text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors font-semibold ${
                    isActive 
                      ? 'text-emerald-900 border-b-2 border-emerald-600 pb-1' 
                      : 'text-emerald-800/60 hover:text-emerald-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative pt-20">
        <Outlet />
      </main>

      {isLandingPage && (
        <footer className="bg-white/30 backdrop-blur-xl py-16 border-t border-emerald-100/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold tracking-tight text-primary font-headline mb-6">NexusAI</div>
              <p className="font-body text-on-surface-variant max-w-sm mb-8">Crafting the future of human resource intelligence through editorial excellence and semantic AI.</p>
              <div className="flex gap-4">
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined" data-icon="public">public</span></a>
                <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined" data-icon="alternate_email">alternate_email</span></a>
              </div>
            </div>
            <div>
              <h5 className="font-headline font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Platform</h5>
              <ul className="space-y-4 font-body text-sm text-on-surface-variant">
                <li><Link className="hover:text-primary" to="/upload">Resume Analysis</Link></li>
                <li><Link className="hover:text-primary" to="/upload">Skill Gap Tool</Link></li>
                <li><Link className="hover:text-primary" to="/">Career Route Map</Link></li>
                <li><Link className="hover:text-primary" to="/">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-headline font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">Company</h5>
              <ul className="space-y-4 font-body text-sm text-on-surface-variant">
                <li><Link className="hover:text-primary" to="/">Our Philosophy</Link></li>
                <li><Link className="hover:text-primary" to="/">Privacy Policy</Link></li>
                <li><Link className="hover:text-primary" to="/">Terms of Service</Link></li>
                <li><Link className="hover:text-primary" to="/">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-emerald-100/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">© 2026 NexusAI. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  )
}
