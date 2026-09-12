'use client';

import React, { useState, useEffect } from 'react';
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
import { Zap, Shield, Cpu, Layers, Github, ExternalLink, BookOpen, Lock } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-charcoal-950 text-white selection:bg-emerald-neon selection:text-charcoal-950">
      
      {/* Top Header */}
      <Header
        onOpenDeposit={() => setIsDepositOpen(true)}
        vaultBalance={treasuryState.vaultBalance}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero & Treasury Vault Overview */}
        <TreasuryPoolCard
          treasury={treasuryState}
          onOpenDeposit={() => setIsDepositOpen(true)}
        />

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'studio'
                  ? 'bg-emerald-neon text-charcoal-950 shadow-neon-emerald'
                  : 'bg-charcoal-900/60 text-charcoal-500 hover:text-white border border-charcoal-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1. Stealth Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'radar'
                  ? 'bg-cyan-neon text-charcoal-950 shadow-neon-cyan'
                  : 'bg-charcoal-900/60 text-charcoal-500 hover:text-white border border-charcoal-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>2. Privacy Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('circuit')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'circuit'
                  ? 'bg-emerald-glow text-charcoal-950 shadow-neon-emerald'
                  : 'bg-charcoal-900/60 text-charcoal-500 hover:text-white border border-charcoal-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>3. ZK Circuit Inspector</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-white text-charcoal-950 shadow-sm'
                  : 'bg-charcoal-900/60 text-charcoal-500 hover:text-white border border-charcoal-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4. Ledger History ({history.length})</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-xs font-mono text-charcoal-500">
            <span className="flex items-center space-x-1">
              <Lock className="w-3 h-3 text-emerald-neon" />
              <span>Level-3 Compliant Protocol</span>
            </span>
          </div>
        </div>

        {/* Tab Contents */}
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

            {/* Privacy Transparency Quick Peek */}
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

      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal-800/80 bg-charcoal-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-500">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold">StealthPay Protocol</span>
            <span>—</span>
            <span>Confidential Split & Payroll on Midnight Network</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/nitinkapoor009988-cloud"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-neon flex items-center space-x-1 transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-charcoal-700">|</span>
            <span className="text-emerald-neon">Compact Circuit v0.20</span>
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
