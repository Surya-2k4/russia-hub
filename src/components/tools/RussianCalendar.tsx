"use client";

import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Flag,
  BookOpen,
  Coffee,
  PartyPopper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RUSSIAN_HOLIDAYS = [
  { date: '01-01', name: "New Year's Day", type: 'National' },
  { date: '01-07', name: "Orthodox Christmas", type: 'Religious' },
  { date: '01-25', name: "Tatyana's Day (Student Day)", type: 'Special' },
  { date: '02-23', name: "Defender of the Fatherland", type: 'National' },
  { date: '03-08', name: "Intl. Women's Day", type: 'National' },
  { date: '05-01', name: "Spring & Labor Day", type: 'National' },
  { date: '05-09', name: "Victory Day", type: 'Heroic' },
  { date: '06-12', name: "Russia Day", type: 'National' },
  { date: '11-04', name: "Unity Day", type: 'National' },
];

const ACADEMIC_EVENTS = [
  { month: 0, event: "Winter Exams (Session)", color: "blue" },
  { month: 1, event: "Semester 2 Starts", color: "emerald" },
  { month: 5, event: "Summer Exams (Session)", color: "blue" },
  { month: 6, event: "Summer Holidays", color: "orange" },
  { month: 8, event: "Semester 1 Starts", color: "emerald" },
];

export function RussianCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = [];
  const totalDays = daysInMonth(year, currentDate.getMonth());
  const startOffset = firstDayOfMonth(year, currentDate.getMonth());

  // Fill empty days for start
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const isHoliday = (day: number) => {
    const dateStr = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return RUSSIAN_HOLIDAYS.find(h => h.date === dateStr);
  };

  const academicEvent = ACADEMIC_EVENTS.find(e => e.month === currentDate.getMonth());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Calendar Grid */}
      <div className="lg:col-span-3 space-y-6">
         <div className="glass p-6 rounded-3xl border border-border bg-surface/50">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-600/10 rounded-xl text-red-500"><CalendarIcon size={20} /></div>
                  <h3 className="font-black text-foreground tracking-tight">{monthName} {year}</h3>
               </div>
               <div className="flex gap-1">
                  <button onClick={prevMonth} className="p-2 hover:bg-foreground/5 rounded-lg transition-colors text-muted"><ChevronLeft size={18} /></button>
                  <button onClick={nextMonth} className="p-2 hover:bg-foreground/5 rounded-lg transition-colors text-muted"><ChevronRight size={18} /></button>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                 <div key={d} className="text-center text-[8px] font-black uppercase text-muted tracking-widest py-2">
                    {d}
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
               {days.map((day, idx) => {
                 if (!day) return <div key={idx} className="aspect-square" />;
                 const holiday = isHoliday(day);
                 return (
                   <div 
                     key={idx} 
                     className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all group cursor-default ${
                       holiday 
                         ? 'bg-red-500/10 border-red-500/20 text-red-500 font-black' 
                         : 'bg-background border-border text-foreground'
                     }`}
                   >
                      <span className="text-sm">{day}</span>
                      {holiday && (
                        <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full" />
                      )}
                      {holiday && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                           <div className="bg-foreground text-background text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg shadow-xl whitespace-nowrap">
                              {holiday.name}
                           </div>
                        </div>
                      )}
                   </div>
                 );
               })}
            </div>
         </div>

         {academicEvent && (
            <div className={`p-4 rounded-2xl border bg-${academicEvent.color}-500/5 border-${academicEvent.color}-500/20 flex items-center gap-4`}>
               <div className={`p-2 bg-${academicEvent.color}-500/10 rounded-lg text-${academicEvent.color}-500`}><BookOpen size={20} /></div>
               <div>
                  <p className="text-[10px] font-black uppercase text-muted leading-none mb-1">Academic Status</p>
                  <p className={`text-xs font-bold text-${academicEvent.color}-500`}>{academicEvent.event}</p>
               </div>
            </div>
         )}
      </div>

      {/* Sidebar: Holidays & Tips */}
      <div className="lg:col-span-2 space-y-6">
         <div className="glass p-6 rounded-3xl border border-border bg-surface/50 h-full">
            <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
               <Flag size={14} className="text-red-500" /> Key Russian Holidays
            </h4>
            
            <div className="space-y-4">
               {RUSSIAN_HOLIDAYS.map((holiday, idx) => (
                 <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border hover:border-red-500/30 transition-all">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-mono text-muted bg-foreground/5 px-2 py-1 rounded-lg">{holiday.date}</span>
                       <span className="text-xs font-bold text-foreground">{holiday.name}</span>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      holiday.type === 'National' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                       {holiday.type}
                    </span>
                 </div>
               ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
               <div className="flex items-center gap-3 mb-4">
                  <Coffee size={18} className="text-blue-500" />
                  <h4 className="text-xs font-black text-muted uppercase tracking-widest">Bridging Days</h4>
               </div>
               <p className="text-[10px] text-muted leading-relaxed">
                  In Russia, if a holiday falls on a Tuesday or Thursday, the government often "bridges" the weekend (e.g., moves a Saturday work day to Monday) to provide a 4-day continuous break.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
