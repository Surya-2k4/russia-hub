export function Footer() {
  return (
    <footer className="w-full bg-[#0D1117] border-t border-[#30363D] py-12 px-4 mb-20 md:mb-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent">
            Russia Student Hub
          </h3>
          <p className="text-sm text-[#8B949E]">Created for students, by students.</p>
        </div>
        
        <div className="flex gap-6 text-[#8B949E] text-sm">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact US</Link>
        </div>
        
        <p className="text-xs text-[#8B949E]">
          © 2024 Russia Student Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import Link from 'next/link';
