'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { TreasuryPoolCard } from '@/components/TreasuryPoolCard';
import { DisbursementStudio } from '@/components/DisbursementStudio';
import { PrivacyRadar } from '@/components/PrivacyRadar';
import { CircuitVisualizer } from '@/components/CircuitVisualizer';
import { TransactionLog } from '@/components/TransactionLog';
import { ProofGenerationModal } from '@/components/ProofGenerationModal';
import { DepositModal } from '@/components/DepositModal';
import { RecipientRow, BatchRecord, ProofStep, TreasuryState } from '@/types';
import { PRESET_TEMPLATES } from '@/lib/presets';
import { stealthPayService, generateBytes32 } from '@/lib/midnight/stealth-service';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  Github, 
  ExternalLink, 
  Lock, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function Home() {
  const initialPreset = PRESET_TEMPLATES[0];
  const initialPool = initialPreset.recipients.reduce((sum, r) => sum + r.amount, 0);

  const [recipients, setRecipients] = useState<RecipientRow[]>(
    initialPreset.recipients.map((r) => ({
      ...r,
      id: generateBytes32('id'),
      salt: generateBytes32('salt'),
    }))
  );
  const [poolAmount, setPoolAmount] = useState<number>(initialPool);
  const [batchMemo, setBatchMemo] = useState<string>(`${initialPreset.name} - Stealth Batch`);
  const [treasuryState, setTreasuryState] = useState<TreasuryState>(stealthPayService.getTreasuryState());
  const [history, setHistory] = useState<BatchRecord[]>(stealthPayService.getTransactionHistory());

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'studio' | 'radar' | 'circuit' | 'history'>('studio');

  // Modal States
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isProofComplete, setIsProofComplete] = useState(false);
  const [proofError, setProofError] = useState<string | undefined>(undefined);
  const [currentTxHash, setCurrentTxHash] = useState<string | undefined>(undefined);
  const [currentBatchId, setCurrentBatchId] = useState<string | undefined>(undefined);
  const [proofSteps, setProofSteps] = useState<ProofStep[]>([
    { id: 'witness_gen', label: 'Local Witness Construction', detail: 'Waiting to start...', status: 'pending' },
    { id: 'solvency_check', label: 'ZK Solvency Constraint Arithmetization', detail: 'Waiting...', status: 'pending' },
    { id: 'merkle_tree', label: 'Commitment Merkle Tree Synthesis', detail: 'Waiting...', status: 'pending' },
    { id: 'halo2_proving', label: 'Compact ZK-SNARK Proof Generation', detail: 'Waiting...', status: 'pending' },
    { id: 'wallet_sign', label: 'Lace DApp Signature & Authorization', detail: 'Waiting...', status: 'pending' },
    { id: 'broadcast', label: 'Midnight Preprod Testnet Ledger Broadcast', detail: 'Waiting...', status: 'pending' },
    { id: 'confirmed', label: 'Payroll Batch Confirmed On-Chain', detail: 'Waiting...', status: 'pending' },
  ]);

  const constraints = stealthPayService.getCircuitConstraints(recipients, poolAmount);

  const handleDeposit = (amount: number) => {
    const updated = stealthPayService.depositToTreasury(amount);
    setTreasuryState(updated);
  };

  const handleExecutePayout = async () => {
    setIsProofModalOpen(true);
    setIsProofComplete(false);
    setProofError(undefined);

    // Reset steps
    setProofSteps([
      { id: 'witness_gen', label: 'Local Witness Construction', detail: 'Generating private vectors...', status: 'pending' },
      { id: 'solvency_check', label: 'ZK Solvency Constraint Arithmetization', detail: 'Waiting...', status: 'pending' },
      { id: 'merkle_tree', label: 'Commitment Merkle Tree Synthesis', detail: 'Waiting...', status: 'pending' },
      { id: 'halo2_proving', label: 'Compact ZK-SNARK Proof Generation', detail: 'Waiting...', status: 'pending' },
      { id: 'wallet_sign', label: 'Lace DApp Signature & Authorization', detail: 'Waiting...', status: 'pending' },
      { id: 'broadcast', label: 'Midnight Preprod Testnet Ledger Broadcast', detail: 'Waiting...', status: 'pending' },
      { id: 'confirmed', label: 'Payroll Batch Confirmed On-Chain', detail: 'Waiting...', status: 'pending' },
    ]);

    try {
      const record = await stealthPayService.executeStealthPayout(
        recipients,
        poolAmount,
        batchMemo,
        (updatedStep) => {
          setProofSteps((prev) =>
            prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
          );
        }
      );

      setCurrentTxHash(record.txHash);
      setCurrentBatchId(record.batchId);
      setIsProofComplete(true);
      setTreasuryState(stealthPayService.getTreasuryState());
      setHistory(stealthPayService.getTransactionHistory());
    } catch (err: any) {
      setProofError(err?.message || 'Execution failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-onyx-950 text-white selection:bg-emerald-neon selection:text-onyx-950 overflow-x-hidden">
      
      {/* Top Floating Header */}
      <Header
        onOpenDeposit={() => setIsDepositOpen(true)}
        vaultBalance={treasuryState.vaultBalance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        
        {/* Hero Section */}
        <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Ambient Glow Pedestal Behind Hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[540px] h-[240px] bg-radial-pedestal pointer-events-none -z-10" />

          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-onyx-900/80 border border-white/10 text-xs font-mono text-onyx-300 shadow-sm backdrop-blur-md mb-6 hover:border-emerald-neon/30 transition">
            <span className="text-emerald-neon text-xs">✦</span>
            <span className="tracking-wide uppercase text-[11px] font-semibold text-onyx-200">
              Midnight Protocol Level-3 Compliant
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] text-gradient-silver">
            Where Digital Finance Finds Sanctuary Online.
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-onyx-300 max-w-2xl font-sans font-normal leading-relaxed">
            Distribute enterprise salaries, DAO contributor payouts, and confidential splits with zero financial surveillance. Mathematical solvency proofs verified by Midnight Network Compact ZK circuits.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => {
                setActiveTab('studio');
                const el = document.getElementById('studio-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-white text-onyx-950 font-semibold text-sm hover:bg-neutral-200 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <span>Launch Stealth Studio</span>
              <ChevronRight className="w-4 h-4 text-onyx-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('circuit')}
              className="px-6 py-3 rounded-full bg-onyx-900/90 border border-white/10 hover:border-white/20 text-white font-mono text-sm transition hover:bg-onyx-850 flex items-center space-x-2"
            >
              <Cpu className="w-4 h-4 text-emerald-neon" />
              <span>Inspect ZK Circuit</span>
            </button>
          </div>

          {/* Ecosystem Trust Bar */}
          <div className="mt-12 sm:mt-16 w-full pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono text-onyx-400 tracking-wider uppercase">
            <span className="flex items-center space-x-1.5 hover:text-white transition">
              <span className="text-emerald-neon">●</span>
              <span>Midnight Network</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition">
              <span className="text-cyan-neon">●</span>
              <span>Lace Wallet DApp</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition">
              <span className="text-white">●</span>
              <span>Compact v0.20</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition">
              <span className="text-emerald-neon">●</span>
              <span>Halo2 / PLONK ZK</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-white transition">
              <span className="text-cyan-neon">●</span>
              <span>Preprod Testnet</span>
            </span>
          </div>

        </section>

        {/* Treasury Vault & Solvency Bento Overview */}
        <div id="vault-overview">
          <TreasuryPoolCard
            treasury={treasuryState}
            onOpenDeposit={() => setIsDepositOpen(true)}
          />
        </div>

        {/* Navigation Tabs Bar for Mobile / Tablet */}
        <div className="flex md:hidden items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'studio'
                ? 'bg-white text-onyx-950 font-bold'
                : 'bg-onyx-900 text-onyx-400 border border-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'radar'
                ? 'bg-white text-onyx-950 font-bold'
                : 'bg-onyx-900 text-onyx-400 border border-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('circuit')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'circuit'
                ? 'bg-white text-onyx-950 font-bold'
                : 'bg-onyx-900 text-onyx-400 border border-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ZK Circuit</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-white text-onyx-950 font-bold'
                : 'bg-onyx-900 text-onyx-400 border border-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ledger ({history.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div id="studio-section" className="space-y-8">
          {activeTab === 'studio' && (
            <div className="space-y-8 animate-fade-in">
              <DisbursementStudio
                recipients={recipients}
                setRecipients={setRecipients}
                poolAmount={poolAmount}
                setPoolAmount={setPoolAmount}
                batchMemo={batchMemo}
                setBatchMemo={setBatchMemo}
                onExecute={handleExecutePayout}
                vaultBalance={treasuryState.vaultBalance}
              />

              {/* Privacy Radar Live Inspection */}
              <PrivacyRadar
                recipients={recipients}
                poolAmount={poolAmount}
                batchMemo={batchMemo}
              />
            </div>
          )}

          {activeTab === 'radar' && (
            <div className="animate-fade-in">
              <PrivacyRadar
                recipients={recipients}
                poolAmount={poolAmount}
                batchMemo={batchMemo}
              />
            </div>
          )}

          {activeTab === 'circuit' && (
            <div className="animate-fade-in">
              <CircuitVisualizer constraints={constraints} />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-fade-in">
              <TransactionLog history={history} />
            </div>
          )}
        </div>

      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-white/5 bg-onyx-950/80 backdrop-blur-md py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-onyx-400">
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-neon text-sm font-bold">✦</span>
              <span className="text-white font-bold">StealthPay Protocol</span>
            </div>
            <span className="hidden sm:inline text-onyx-600">—</span>
            <span>Confidential Split & Payroll on Midnight Network</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/nitinkapoor009988-cloud/StealthPay"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-neon flex items-center space-x-1.5 transition text-onyx-300"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            <span className="text-onyx-700">|</span>

            <a
              href="https://midnight.network"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-neon flex items-center space-x-1.5 transition text-onyx-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Midnight Docs</span>
            </a>

            <span className="text-onyx-700">|</span>

            <span className="text-emerald-neon px-2.5 py-1 rounded-full bg-emerald-neon/10 border border-emerald-neon/20 text-[10px]">
              Level 3 Build
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDeposit={handleDeposit}
        currentBalance={treasuryState.vaultBalance}
      />

      <ProofGenerationModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        steps={proofSteps}
        isComplete={isProofComplete}
        error={proofError}
        txHash={currentTxHash}
        batchId={currentBatchId}
        poolAmount={poolAmount}
        recipientCount={recipients.length}
      />

    </div>
  );
}
