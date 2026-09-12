'use client';

import React from 'react';
import { TreasuryState } from '@/types';
import { Vault, ShieldCheck, ArrowUpRight, Zap, Layers, Lock, Cpu } from 'lucide-react';

interface TreasuryPoolCardProps {
  treasury: TreasuryState;
  onOpenDeposit: () => void;
}

export const TreasuryPoolCard: React.FC<TreasuryPoolCardProps> = ({
  treasury,
  onOpenDeposit,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-charcoal-900/90 border border-charcoal-700/70 p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-neon/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-cyan-neon/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Left: Primary Vault Balance */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-dark/40 border border-emerald-neon/30 text-emerald-neon">
              <Vault className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Midnight Protocol Vault
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-emerald-neon font-mono font-medium">● Solvency Verified</span>
                <span className="text-charcoal-600 text-xs">|</span>
                <span className="text-xs text-charcoal-500">Compact Circuit v0.20</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              {treasury.vaultBalance.toLocaleString()}
            </span>
            <span className="text-xl font-bold font-mono text-emerald-neon">tDUST</span>
          </div>

          <p className="text-xs text-charcoal-500 max-w-md leading-relaxed">
            Locked on Midnight Preprod smart contract. All payouts are backed by cryptographic equality proofs without disclosing individual salaries.
          </p>

          <div className="pt-2 flex items-center space-x-3">
            <button
              onClick={onOpenDeposit}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-neon to-emerald-glow text-charcoal-950 font-bold text-xs hover:opacity-95 shadow-neon-emerald transition"
            >
              <span>Deposit to Treasury Pool</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 font-mono">
              <Lock className="w-3.5 h-3.5 text-cyan-neon" />
              <span>Shielded Ledger State</span>
            </div>
          </div>
        </div>

        {/* Right: Key Protocol Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 lg:w-1/2">
          
          {/* Metric 1: Total Disbursed */}
          <div className="p-4 rounded-2xl bg-charcoal-950/70 border border-charcoal-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-charcoal-500">All-Time Disbursed</span>
              <ShieldCheck className="w-4 h-4 text-emerald-neon" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {treasury.totalHistoricalDisbursed.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-neon font-mono">
              100% ZK-Shielded
            </div>
          </div>

          {/* Metric 2: Batches Processed */}
          <div className="p-4 rounded-2xl bg-charcoal-950/70 border border-charcoal-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-charcoal-500">Batches Settled</span>
              <Layers className="w-4 h-4 text-cyan-neon" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {treasury.batchCount} Batches
            </div>
            <div className="text-[10px] text-cyan-neon font-mono">
              0 Leaked Salaries
            </div>
          </div>

          {/* Metric 3: Proof Latency */}
          <div className="p-4 rounded-2xl bg-charcoal-950/70 border border-charcoal-800/80 space-y-1 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-charcoal-500">Halo2 Proof Avg</span>
              <Cpu className="w-4 h-4 text-amber-neon" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              ~1.2s
            </div>
            <div className="text-[10px] text-amber-neon font-mono">
              PLONK Witness Arith
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
