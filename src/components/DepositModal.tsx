'use client';

import React, { useState } from 'react';
import { Vault, ArrowUpRight, X, Sparkles, ShieldCheck } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
  currentBalance: number;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  currentBalance,
}) => {
  const [amount, setAmount] = useState<number>(50000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    onDeposit(amount);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-charcoal-900 border border-charcoal-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-52 h-52 bg-emerald-neon/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-neon/15 text-emerald-neon border border-emerald-neon/30">
              <Vault className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">
                Deposit to Treasury Vault
              </h3>
              <p className="text-xs text-charcoal-500">
                Midnight Preprod Contract Pool
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-500 hover:text-white hover:bg-charcoal-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-6">
          <div className="p-3.5 rounded-2xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-between text-xs font-mono">
            <span className="text-charcoal-500">Current Vault Liquidity:</span>
            <span className="text-emerald-neon font-bold">{currentBalance.toLocaleString()} tDUST</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Deposit Amount (tDUST)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-700 text-white font-mono text-xl font-bold focus:outline-none focus:border-emerald-neon transition"
                placeholder="50000"
                required
              />
              <span className="absolute right-4 top-3.5 text-xs text-charcoal-500 font-mono font-bold">
                tDUST
              </span>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[25000, 50000, 100000, 250000].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="px-2 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 text-xs font-mono text-charcoal-500 hover:text-white border border-charcoal-800 transition"
              >
                +{val / 1000}k
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-500 hover:text-white text-xs font-mono transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || amount <= 0}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-neon to-cyan-neon text-charcoal-950 font-bold font-mono text-xs shadow-neon-emerald hover:opacity-95 transition disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Confirm Deposit'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
