import { UniversityFinder } from '@/components/universities/UniversityFinder';
import { LearnRussian } from '@/components/universities/LearnRussian';
import { GraduationCap, Sparkles, BookOpen } from 'lucide-react';

export default function UniversitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
           <Sparkles size={14} /> Compare Programs 2024
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">University <span className="text-blue-500">Finder</span></h1>
        <p className="text-[#8B949E] text-lg max-w-2xl">
          From legendary Moscow medical schools to cutting-edge technical state universities. Find your perfect Alma Mater in Russia.
        </p>
      </header>

      <div className="space-y-32">
        <section>
          <UniversityFinder />
        </section>

        <section>
           <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-border flex-1" />
              <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-border bg-surface text-muted">
                 <BookOpen size={20} className="text-blue-500" />
                 <span className="text-xs font-black uppercase tracking-widest leading-none">Language Mastery</span>
              </div>
              <div className="h-px bg-border flex-1" />
           </div>
           
           <LearnRussian />
        </section>
      </div>
    </div>
  );
}
