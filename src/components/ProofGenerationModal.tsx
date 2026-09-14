'use client';

import React, { useEffect } from 'react';
import { ProofStep } from '@/types';
import { formatNumber } from '@/lib/utils';
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
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00FF9D', '#00E5FF', '#70FFBE', '#FFFFFF'],
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isComplete || error)) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, error, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-onyx-950/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl luxury-card-highlight p-6 sm:p-8 overflow-hidden shadow-2xl">
        
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-emerald-neon/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-cyan-neon/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-onyx-900 border border-emerald-neon/30 text-emerald-neon shadow-neon-emerald">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono text-white">
                {isComplete ? 'Stealth Payroll Confirmed' : 'Synthesizing Zero-Knowledge Proof'}
              </h3>
              <p className="text-xs text-onyx-400 font-mono">
                Midnight Compact Circuit & Solvency Verification Pipeline
              </p>
            </div>
          </div>

          {isComplete && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-onyx-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Batch Overview Banner */}
        <div className="my-5 p-4 rounded-2xl bg-onyx-950/80 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-onyx-400">Target Disbursal Pool:</span>
            <span className="ml-2 text-white font-bold" suppressHydrationWarning>{formatNumber(poolAmount)} tDUST</span>
          </div>
          <div>
            <span className="text-onyx-400">Recipients:</span>
            <span className="ml-2 text-emerald-neon font-bold">{recipientCount} Shielded</span>
          </div>
          <div>
            <span className="text-onyx-400">Network:</span>
            <span className="ml-2 text-cyan-neon font-bold">Midnight Preprod</span>
          </div>
        </div>

        {/* Live Step Progress List */}
        <div className="space-y-3 my-6 max-h-[340px] overflow-y-auto pr-1">
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
                    ? 'bg-onyx-950 border-emerald-neon/50 shadow-neon-emerald'
                    : isDone
                    ? 'bg-onyx-950/70 border-white/5'
                    : 'bg-onyx-950/30 border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-neon" />}
                    {isRunning && <Loader2 className="w-4 h-4 text-emerald-neon animate-spin" />}
                    {isPending && <div className="w-4 h-4 rounded-full border border-onyx-700"></div>}
                    {isErr && <AlertCircle className="w-4 h-4 text-rose-neon" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold font-mono ${isRunning ? 'text-emerald-neon' : isDone ? 'text-white' : 'text-onyx-500'}`}>
                        {idx + 1}. {step.label}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-onyx-900 text-onyx-400 border border-white/5">
                        {step.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-onyx-400 mt-1 leading-relaxed">
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
          <div className="p-4 rounded-2xl bg-rose-neon/10 border border-rose-neon/30 text-rose-neon text-xs mb-4 font-mono">
            <div className="font-bold uppercase tracking-wider">Verification Error</div>
            <div>{error}</div>
          </div>
        )}

        {/* Completion Success Footer */}
        {isComplete && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="p-4 rounded-2xl bg-onyx-950 border border-emerald-neon/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-neon font-bold flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Settled on Midnight Preprod</span>
                </span>
                <span className="text-onyx-400 font-mono">Solvency: 100% Guaranteed</span>
              </div>
              <div className="text-[11px] text-onyx-400 font-mono break-all">
                TX Hash: <span className="text-white">{txHash}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <a
                href={`https://preprod.midnight.network/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-onyx-900 hover:bg-onyx-800 text-onyx-300 hover:text-white text-xs font-mono border border-white/10 transition"
              >
                <span>View on Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white text-onyx-950 font-bold font-mono text-xs shadow-pill hover:bg-neutral-200 transition"
              >
                Done & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
