"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  TrendingDown, 
  TrendingUp, 
  Coffee, 
  Home, 
  Bus, 
  ShoppingBag, 
  MoreHorizontal,
  PieChart as PieIcon,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

const CATEGORIES = [
  { name: 'Food', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Rent', icon: Home, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Travel', icon: Bus, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Shopping', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Other', icon: MoreHorizontal, color: 'text-gray-500', bg: 'bg-gray-500/10' },
];

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {/* Left: Input & Summary */}
      <div className="space-y-6">
        <div className="glass p-8 rounded-3xl border border-border bg-surface/50">
           <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500">
                 <Wallet size={24} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-foreground leading-tight">Monthly Tracker</h3>
                 <p className="text-xs text-muted">Keep your Rubles in check</p>
              </div>
           </div>

           <form onSubmit={addExpense} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted ml-1">Expense Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Metro Pass" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-hidden transition-all shadow-inner"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted ml-1">Amount (RUB)</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-hidden transition-all shadow-inner"
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-muted ml-1">Category</label>
                 <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.name}
                        type="button"
                        onClick={() => setCategory(cat.name)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border flex items-center gap-2 ${
                          category === cat.name ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-background border-border text-muted hover:border-blue-500/50'
                        }`}
                      >
                         <cat.icon size={12} />
                         {cat.name}
                      </button>
                    ))}
                 </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-foreground text-background font-black py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs mt-2"
              >
                 <Plus size={18} /> Add Record
              </button>
           </form>

           <div className="mt-8 pt-8 border-t border-border flex justify-between items-center text-foreground">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-600/10 rounded-lg"><PieIcon size={20} className="text-blue-500" /></div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-muted leading-none mb-1">Total Spent</p>
                    <p className="text-2xl font-black">{total.toLocaleString()} <span className="text-xs text-blue-500 ml-1">RUB</span></p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase text-green-500 leading-none mb-1">Status</p>
                 <div className="flex items-center gap-2 text-xs font-bold">
                    <TrendingUp size={14} className="text-green-500 rotate-180" /> Healthy Budget
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Right: History List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-black uppercase tracking-widest text-muted">Transaction History</h3>
           <p className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">{expenses.length} Records</p>
        </div>

        <div className="space-y-3 h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
           <AnimatePresence initial={false}>
              {expenses.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted border-2 border-dashed border-border rounded-3xl">
                   <TrendingDown size={48} className="opacity-20 mb-4" />
                   <p className="text-xs font-bold uppercase tracking-widest opacity-50">No transactions recorded</p>
                </div>
              ) : (
                expenses.map((expense) => {
                  const cat = CATEGORIES.find(c => c.name === expense.category) || CATEGORIES[4];
                  return (
                    <motion.div 
                      key={expense.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      className="glass p-4 rounded-2xl border border-border group hover:border-blue-500/30 transition-all flex items-center justify-between"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                             <cat.icon size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-foreground">{expense.title}</h4>
                             <p className="text-[10px] text-muted">{expense.date} • {expense.category}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <p className="text-sm font-black text-foreground">-{expense.amount.toLocaleString()}</p>
                          <button 
                            onClick={() => deleteExpense(expense.id)}
                            className="p-2 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </motion.div>
                  );
                })
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
