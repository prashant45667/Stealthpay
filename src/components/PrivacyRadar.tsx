'use client';

import React, { useState } from 'react';
import { RecipientRow } from '@/types';
import { formatNumber } from '@/lib/utils';
import { Eye, EyeOff, Shield, Globe, Lock, ShieldCheck, Sparkles, Hash } from 'lucide-react';

interface PrivacyRadarProps {
  recipients: RecipientRow[];
  poolAmount: number;
  batchMemo: string;
}

export const PrivacyRadar: React.FC<PrivacyRadarProps> = ({
  recipients,
  poolAmount,
  batchMemo,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'public' | 'private'>('split');

  return (
    <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-700/70 p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              Privacy Transparency Radar
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">
            Compare what the public Midnight blockchain sees vs what the local treasury enclave sees.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'split' ? 'bg-emerald-neon text-charcoal-950 font-bold' : 'text-charcoal-500 hover:text-white'
            }`}
          >
            Side-by-Side Dual View
          </button>
          <button
            onClick={() => setViewMode('public')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'public' ? 'bg-cyan-neon text-charcoal-950 font-bold' : 'text-charcoal-500 hover:text-white'
            }`}
          >
            Public Ledger Only
          </button>
          <button
            onClick={() => setViewMode('private')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              viewMode === 'private' ? 'bg-emerald-glow text-charcoal-950 font-bold' : 'text-charcoal-500 hover:text-white'
            }`}
          >
            Manager Enclave Only
          </button>
        </div>
      </div>

      {/* Dual Panel Comparison Grid */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* LEFT: Public On-Chain Ledger View */}
        {(viewMode === 'split' || viewMode === 'public') && (
          <div className="rounded-2xl bg-charcoal-950/90 border border-cyan-neon/30 p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-neon" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-neon">
                  🌐 Public On-Chain Explorer View
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 font-mono">
                Visible to World
              </span>
            </div>

            {/* Public Disclosed Parameters */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <div className="text-[10px] text-charcoal-500">Disclosed Pool Sum</div>
                <div className="text-sm font-bold text-white mt-0.5" suppressHydrationWarning>
                  {formatNumber(poolAmount)} tDUST
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <div className="text-[10px] text-charcoal-500">Recipient Count</div>
                <div className="text-sm font-bold text-cyan-neon mt-0.5">
                  {recipients.length} Shielded Nodes
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-1 font-mono text-xs">
              <div className="text-[10px] text-charcoal-500">ZK Merkle Commitment Root</div>
              <div className="text-[11px] text-charcoal-500 truncate">
                0xzk_merkle_root_77a1bc9482d3e04918efbc62719a840e...
              </div>
            </div>

            {/* Shielded Obfuscated Recipient List */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider">
                Blockchain Recipient Records (Zero-Knowledge Protected):
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {recipients.map((_, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-charcoal-900/80 border border-charcoal-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-neon" />
                      <span className="text-charcoal-500">
                        Witness_Vector_0x{i.toString(16).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-neon/10 text-emerald-neon">
                      🔒 Shielded Amount
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-charcoal-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-neon" />
              <span>No individual salaries or wallet mappings exist on public ledger.</span>
            </div>
          </div>
        )}

        {/* RIGHT: Local Manager Enclave View */}
        {(viewMode === 'split' || viewMode === 'private') && (
          <div className="rounded-2xl bg-charcoal-950/90 border border-emerald-neon/30 p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-neon" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-neon">
                  🛡️ Local Manager Enclave View
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono">
                Decrypted Local Session
              </span>
            </div>

            {/* Enclave Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <div className="text-[10px] text-charcoal-500">Batch Memo</div>
                <div className="text-sm font-bold text-white mt-0.5 truncate">
                  {batchMemo || 'Stealth Batch'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-charcoal-900 border border-charcoal-800">
                <div className="text-[10px] text-charcoal-500">Allocated Total</div>
                <div className="text-sm font-bold text-emerald-neon mt-0.5" suppressHydrationWarning>
                  {formatNumber(poolAmount)} tDUST
                </div>
              </div>
            </div>

            {/* Decrypted Itemized List */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider">
                Itemized Compensation Breakdown (Authorized Officer):
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {recipients.map((r, i) => {
                  const pct = poolAmount > 0 ? ((r.amount / poolAmount) * 100).toFixed(1) : '0';
                  return (
                    <div
                      key={r.id || i}
                      className="p-2.5 rounded-xl bg-charcoal-900/80 border border-charcoal-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-white font-medium">{r.name}</div>
                        <div className="text-[10px] text-charcoal-500 font-mono">{r.department}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-emerald-neon font-bold" suppressHydrationWarning>{formatNumber(r.amount)} tDUST</div>
                        <div className="text-[10px] text-charcoal-500">{pct}% split</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-charcoal-500 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-neon" />
              <span>Decrypted via authorized treasury manager witness keypair.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
