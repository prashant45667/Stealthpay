'use client';

import React from 'react';
import { CircuitConstraintInfo } from '@/types';
import { Cpu, ShieldCheck, CheckCircle2, XCircle, Code2, Lock } from 'lucide-react';

interface CircuitVisualizerProps {
  constraints: CircuitConstraintInfo[];
}

export const CircuitVisualizer: React.FC<CircuitVisualizerProps> = ({ constraints }) => {
  return (
    <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-700/70 p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              Midnight Compact ZK Circuit Inspector
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">
            Formal mathematical constraints enforced inside the Halo2/PLONK zero-knowledge circuit.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono font-medium">
            Compact v0.20
          </span>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 font-mono font-medium">
            Halo2 Polynomials
          </span>
        </div>
      </div>

      {/* Constraints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {constraints.map((c, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              c.verified
                ? 'bg-charcoal-950/80 border-emerald-neon/40 shadow-sm'
                : 'bg-charcoal-950/80 border-amber-neon/40'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-charcoal-500">
                  R1CS-{idx + 1}
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                  c.privacyType === 'SHIELDED_WITNESS'
                    ? 'bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20'
                    : 'bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20'
                }`}>
                  {c.privacyType === 'SHIELDED_WITNESS' ? '🔒 Witness' : '🌐 Ledger'}
                </span>
              </div>

              {c.verified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-neon" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-neon" />
              )}
            </div>

            <div className="mt-3 font-mono font-bold text-white text-xs">
              {c.constraintName}
            </div>

            <div className="mt-2 p-2 rounded-lg bg-charcoal-900 font-mono text-[11px] text-emerald-neon border border-charcoal-800 break-all">
              <code>{c.formula}</code>
            </div>

            <p className="mt-2 text-[11px] text-charcoal-500 leading-relaxed">
              {c.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 rounded-2xl bg-charcoal-950/60 border border-charcoal-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-charcoal-500">
          <Code2 className="w-4 h-4 text-emerald-neon" />
          <span>Compiled with @midnight-ntwrk/compactc → managed circuits & keys</span>
        </div>
        <span className="text-emerald-neon font-bold">1,024 Constraints / Batch</span>
      </div>

    </div>
  );
};
