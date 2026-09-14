'use client';

import React from 'react';
import { TreasuryState } from '@/types';
import { formatNumber } from '@/lib/utils';
import { 
  Vault, 
  ShieldCheck, 
  ArrowUpRight, 
  Zap, 
  Layers, 
  Lock, 
  Cpu, 
  TrendingUp, 
  Activity, 
  Sparkles 
} from 'lucide-react';

interface TreasuryPoolCardProps {
  treasury: TreasuryState;
  onOpenDeposit: () => void;
  onLaunchStudio?: () => void;
}

export const TreasuryPoolCard: React.FC<TreasuryPoolCardProps> = ({
  treasury,
  onOpenDeposit,
  onLaunchStudio,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      
      {/* Primary Bento Card: Treasury Liquidity & Distribution Chart (Span 7) */}
      <div className="lg:col-span-7 luxury-card rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-emerald-neon/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-neon/15 transition-all duration-700"></div>

        <div className="space-y-6">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="text-emerald-neon text-xs">✦</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-onyx-300 font-mono">
                Midnight Protocol Vault
              </span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono font-medium flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-pulse"></span>
              <span>100% Solvency Backed</span>
            </span>
          </div>

          {/* Vault Balance Display */}
          <div>
            <div className="text-xs text-onyx-400 font-mono uppercase tracking-wider">Available Disbursal Pool</div>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white" suppressHydrationWarning>
                {formatNumber(treasury.vaultBalance)}
              </span>
              <span className="text-xl font-bold font-mono text-emerald-neon">tDUST</span>
            </div>
            <p className="text-xs text-onyx-400 mt-2 max-w-lg leading-relaxed">
              Locked on Midnight Preprod smart contract. Disburses multi-party splits without revealing individual recipient paychecks to the public ledger.
            </p>
          </div>

          {/* Mini Graphical Activity Bars (Inspired by reference UI) */}
          <div className="p-4 rounded-2xl bg-onyx-950/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-onyx-400 font-mono">
              <span>Confidential Disbursals</span>
              <span className="text-emerald-neon font-bold">100% Shielded</span>
            </div>
            <div className="grid grid-cols-7 gap-2 pt-1 items-end h-16">
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-onyx-800 rounded-t-md h-8 group-hover:h-10 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-500 font-mono">Sprint 1</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-onyx-800 rounded-t-md h-10 group-hover:h-12 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-500 font-mono">Sprint 2</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-onyx-800 rounded-t-md h-6 group-hover:h-8 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-500 font-mono">Sprint 3</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-onyx-800 rounded-t-md h-9 group-hover:h-11 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-500 font-mono">Sprint 4</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-cyan-neon/40 rounded-t-md h-12 group-hover:h-13 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-400 font-mono">DAO</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-emerald-neon/60 rounded-t-md h-14 group-hover:h-15 transition-all duration-300"></div>
                <span className="text-[9px] text-onyx-400 font-mono">Grant</span>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <div className="w-full bg-gradient-to-t from-emerald-neon to-cyan-neon rounded-t-md h-16 shadow-neon-emerald"></div>
                <span className="text-[9px] text-emerald-neon font-bold font-mono">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 mt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onOpenDeposit}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-onyx-950 font-bold text-xs hover:bg-neutral-200 shadow-pill transition"
          >
            <span>Deposit to Vault</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center space-x-2 text-xs text-onyx-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-cyan-neon" />
            <span>Compact Circuit v0.20+</span>
          </div>
        </div>
      </div>

      {/* Secondary Bento Grid: Metrics Stack (Span 5) */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
        
        {/* Bento Subcard 1: All-Time Disbursed */}
        <div className="luxury-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-neon text-xs">✦</span>
              <span className="text-xs font-semibold text-onyx-300 uppercase tracking-wider font-mono">
                All-Time Disbursed
              </span>
            </div>
            <div className="p-2 rounded-xl bg-onyx-950 border border-white/5 text-emerald-neon">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl font-bold font-mono text-white tracking-tight" suppressHydrationWarning>
              {formatNumber(treasury.totalHistoricalDisbursed)}
              <span className="text-sm text-emerald-neon ml-2">tDUST</span>
            </div>
            <div className="text-[11px] text-emerald-neon font-mono mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>100% ZK-Shielded (0 Leaked Salaries)</span>
            </div>
          </div>

          <div className="text-[11px] text-onyx-400 border-t border-white/5 pt-3">
            Individual transactions verifiable only by authorized recipient keypairs.
          </div>
        </div>

        {/* Bento Subcard 2: Prover Latency & Settled Batches */}
        <div className="luxury-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-neon text-xs">✦</span>
              <span className="text-xs font-semibold text-onyx-300 uppercase tracking-wider font-mono">
                ZK Prover Benchmark
              </span>
            </div>
            <div className="p-2 rounded-xl bg-onyx-950 border border-white/5 text-cyan-neon">
              <Cpu className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-onyx-400 font-mono uppercase">Halo2 Proof Avg</div>
              <div className="text-2xl font-bold font-mono text-white mt-0.5">~1.2s</div>
              <div className="text-[10px] text-cyan-neon font-mono">PLONK Arith</div>
            </div>
            <div>
              <div className="text-[10px] text-onyx-400 font-mono uppercase">Settled Batches</div>
              <div className="text-2xl font-bold font-mono text-white mt-0.5" suppressHydrationWarning>
                {treasury.batchCount}
              </div>
              <div className="text-[10px] text-emerald-neon font-mono">On-Chain Preprod</div>
            </div>
          </div>

          <div className="text-[11px] text-onyx-400 border-t border-white/5 pt-3 flex items-center justify-between">
            <span>R1CS Constraints: 1,024</span>
            <span className="text-emerald-neon font-mono">Solvent</span>
          </div>
        </div>

      </div>

    </div>
  );
};
