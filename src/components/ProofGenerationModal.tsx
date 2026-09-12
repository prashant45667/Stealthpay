'use client';

import React, { useEffect } from 'react';
import { ProofStep } from '@/types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  ExternalLink, 
  Cpu, 
  Key, 
  Globe, 
  Layers, 
  Lock,
  X
} from 'lucide-react';

interface ProofGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: ProofStep[];
  isComplete: boolean;
  error?: string;
  txHash?: string;
  batchId?: string;
  poolAmount?: number;
  recipientCount?: number;
}

export const ProofGenerationModal: React.FC<ProofGenerationModalProps> = ({
  isOpen,
  onClose,
  steps,
  isComplete,
  error,
  txHash,
  batchId,
  poolAmount,
  recipientCount,
}) => {
  useEffect(() => {
    if (isComplete) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FF9D', '#00E5FF', '#70FFBE', '#FFFFFF'],
      });
    }
  }, [isComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-charcoal-900 border border-charcoal-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-60 h-60 bg-emerald-neon/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 h-60 bg-cyan-neon/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-charcoal-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-neon/15 text-emerald-neon border border-emerald-neon/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono text-white">
                {isComplete ? 'Stealth Payroll Confirmed' : 'Synthesizing Zero-Knowledge Proof'}
              </h3>
              <p className="text-xs text-charcoal-500">
                Midnight Compact Circuit & Solvency Verification Pipeline
              </p>
            </div>
          </div>

          {isComplete && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-charcoal-500 hover:text-white hover:bg-charcoal-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Batch Overview Banner */}
        <div className="my-5 p-4 rounded-2xl bg-charcoal-950/80 border border-charcoal-800 flex items-center justify-between text-xs font-mono">
          <div>
            <span className="text-charcoal-500">Target Disbursal Pool:</span>
            <span className="ml-2 text-white font-bold">{poolAmount?.toLocaleString()} tDUST</span>
          </div>
          <div>
            <span className="text-charcoal-500">Recipients:</span>
            <span className="ml-2 text-emerald-neon font-bold">{recipientCount} Shielded</span>
          </div>
          <div>
            <span className="text-charcoal-500">Network:</span>
            <span className="ml-2 text-cyan-neon font-bold">Midnight Preprod</span>
          </div>
        </div>

        {/* Live Step Progress List */}
        <div className="space-y-3.5 my-6 max-h-[340px] overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isRunning = step.status === 'in_progress';
            const isPending = step.status === 'pending';
            const isErr = step.status === 'error';

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isRunning
                    ? 'bg-charcoal-950 border-emerald-neon/50 shadow-neon-emerald'
                    : isDone
                    ? 'bg-charcoal-950/60 border-charcoal-800/80'
                    : 'bg-charcoal-950/30 border-charcoal-850 opacity-40'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-neon" />}
                    {isRunning && <Loader2 className="w-4 h-4 text-emerald-neon animate-spin" />}
                    {isPending && <div className="w-4 h-4 rounded-full border border-charcoal-600"></div>}
                    {isErr && <AlertCircle className="w-4 h-4 text-rose-neon" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold font-mono ${isRunning ? 'text-emerald-neon' : isDone ? 'text-white' : 'text-charcoal-500'}`}>
                        {idx + 1}. {step.label}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-charcoal-900 text-charcoal-500">
                        {step.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 mt-1 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Failure Message */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-neon/10 border border-rose-neon/30 text-rose-neon text-xs mb-4">
            <div className="font-bold uppercase tracking-wider">Verification Error</div>
            <div>{error}</div>
          </div>
        )}

        {/* Completion Success Footer */}
        {isComplete && (
          <div className="pt-4 border-t border-charcoal-800 space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-dark/20 border border-emerald-neon/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-neon font-bold flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Settled on Midnight Preprod</span>
                </span>
                <span className="text-charcoal-500 font-mono">Solvency: 100%</span>
              </div>
              <div className="text-[11px] text-charcoal-500 font-mono break-all">
                TX Hash: <span className="text-white">{txHash}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <a
                href={`https://preprod.midnight.network/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-500 hover:text-white text-xs font-mono transition"
              >
                <span>View on Midnight Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-neon to-cyan-neon text-charcoal-950 font-bold font-mono text-xs shadow-neon-emerald hover:opacity-95 transition"
              >
                Done & Return to Studio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
