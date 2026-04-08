"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  GraduationCap, 
  Wallet, 
  Wrench, 
  Map, 
  Menu,
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bureaucracy', label: 'Checklist', icon: CheckSquare },
  { href: '/universities', label: 'Programs', icon: GraduationCap },
  { href: '/finance', label: 'Money', icon: Wallet },
  { href: '/tools', label: 'Tools', icon: Wrench },
  { href: '/community', label: 'Community', icon: Map },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Brand Header (Visible on Mobile) */}
      <header className="sticky top-0 left-0 right-0 z-[100] bg-surface/95 backdrop-blur-xl border-b border-border md:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 font-black text-lg text-gold tracking-tighter">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 via-white to-red-600 border border-white/20 flex items-center justify-center p-0.5">
               <div className="bg-surface w-full h-full rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">RU</span>
               </div>
            </div>
            <span>Russia Hub</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all ${isMobileMenuOpen ? 'bg-red-600/10 text-red-500' : 'bg-muted/10 text-muted'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-[90] bg-background md:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              <div className="px-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Navigational Modules</p>
                 <div className="grid grid-cols-1 gap-3">
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                       const isActive = pathname === href;
                       return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            isActive ? 'bg-blue-600/10 border-blue-500/50' : 'bg-surface/50 border-border'
                          }`}
                        >
                           <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-background text-muted'}`}>
                                 <Icon size={20} />
                              </div>
                              <span className={`text-lg font-bold ${isActive ? 'text-white' : 'text-muted'}`}>{label}</span>
                           </div>
                           <ChevronRight size={18} className={isActive ? 'text-blue-500' : 'text-muted'} />
                        </Link>
                       );
                    })}
                 </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-surface to-blue-900/10 border border-border relative overflow-hidden">
                 <div className="relative z-10">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                       <Sparkles size={16} className="text-blue-400" /> Premium Access
                    </h4>
                    <p className="text-xs text-muted mb-4">Join our community for faster visa processing.</p>
                    <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white shadow-xl">
                       Join Now
                    </Link>
                 </div>
                 <div className="absolute -bottom-4 -right-4 text-blue-500/5 rotate-12">
                    <GraduationCap size={120} />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation (Visible on Desktop, Bottom shortcuts on Mobile) */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-border md:relative md:top-0 md:bg-surface/30 md:border-t-0 md:border-b transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between font-montserrat">
          {/* Logo - Desktop Only */}
          <Link href="/" className="hidden md:flex items-center gap-4 font-black text-xl text-gold tracking-tighter">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 via-white to-red-600 border border-white/20 flex items-center justify-center p-0.5">
               <div className="bg-surface w-full h-full rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-black">RU</span>
               </div>
            </div>
            <span className="hidden lg:inline">Russia Student Hub</span>
          </Link>

          {/* Desktop/Bottom Nav Items */}
          <div className="flex items-center flex-1 md:justify-end">
            <ul className="grid grid-cols-6 w-full md:flex md:gap-8 items-center h-full pb-safe">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} className="relative h-full flex items-center justify-center">
                    <Link
                      href={href}
                      className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-1 py-1 transition-all group w-full ${
                        isActive ? 'text-blue-500 md:text-gold' : 'text-muted hover:text-foreground'
                      }`}
                    >
                      <div className="relative">
                        <Icon size={18} className={`${isActive ? 'scale-110 text-blue-500' : 'group-hover:scale-110 transition-transform'}`} />
                        {isActive && (
                          <motion.div 
                             layoutId="nav-dot"
                             className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full md:hidden"
                          />
                        )}
                      </div>
                      <span className="text-[8px] md:text-sm font-black md:font-bold tracking-tighter md:tracking-normal uppercase md:capitalize text-center">
                        {label}
                      </span>
                      {isActive && (
                        <span className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-gold md:bg-accent rounded-full scale-x-100" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
