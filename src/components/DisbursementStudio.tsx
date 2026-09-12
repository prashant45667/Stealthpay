'use client';

import React, { useState } from 'react';
import { RecipientRow, PresetTemplate } from '@/types';
import { PRESET_TEMPLATES } from '@/lib/presets';
import { generateBytes32 } from '@/lib/midnight/stealth-service';
import { 
  Lock, 
  Globe, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

interface DisbursementStudioProps {
  recipients: RecipientRow[];
  setRecipients: React.Dispatch<React.SetStateAction<RecipientRow[]>>;
  poolAmount: number;
  setPoolAmount: (val: number) => void;
  batchMemo: string;
  setBatchMemo: (val: string) => void;
  onExecute: () => void;
  vaultBalance: number;
}

export const DisbursementStudio: React.FC<DisbursementStudioProps> = ({
  recipients,
  setRecipients,
  poolAmount,
  setPoolAmount,
  batchMemo,
  setBatchMemo,
  onExecute,
  vaultBalance,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('engineering_core');

  const calculatedSum = recipients.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
  const delta = poolAmount - calculatedSum;
  const isSolvent = calculatedSum === poolAmount && poolAmount > 0;
  const hasVaultSufficient = vaultBalance >= poolAmount;
  const canExecute = isSolvent && hasVaultSufficient && recipients.length > 0 && recipients.length <= 8;

  const handleApplyPreset = (preset: PresetTemplate) => {
    setSelectedPresetId(preset.id);
    const total = preset.recipients.reduce((sum, r) => sum + r.amount, 0);
    setPoolAmount(total);
    setBatchMemo(`${preset.name} - Stealth Batch`);
    setRecipients(
      preset.recipients.map((r) => ({
        ...r,
        id: generateBytes32('id'),
        salt: generateBytes32('salt'),
      }))
    );
  };

  const handleAddRecipient = () => {
    if (recipients.length >= 8) return;
    const newRecipient: RecipientRow = {
      id: generateBytes32('id'),
      name: `Recipient #${recipients.length + 1}`,
      address: `mn_addr_preprod1qz7x8k2w9d3v4f5u6t7g8h9j0k1l2m3n4p5q6r7s8t9u${(recipients.length + 1).toString().padStart(2, '0')}`,
      amount: 5000,
      department: 'Ecosystem Contributor',
      notes: 'Bounty reward allocation',
      salt: generateBytes32('salt'),
    };
    const updated = [...recipients, newRecipient];
    setRecipients(updated);
    setPoolAmount(updated.reduce((sum, r) => sum + r.amount, 0));
  };

  const handleRemoveRecipient = (id: string) => {
    const updated = recipients.filter((r) => r.id !== id);
    setRecipients(updated);
    setPoolAmount(updated.reduce((sum, r) => sum + r.amount, 0));
  };

  const handleUpdateRecipient = (id: string, field: keyof RecipientRow, value: string | number) => {
    setRecipients((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  const handleAutoBalancePool = () => {
    setPoolAmount(calculatedSum);
  };

  const handleEqualSplit = () => {
    if (recipients.length === 0 || poolAmount <= 0) return;
    const baseShare = Math.floor(poolAmount / recipients.length);
    const remainder = poolAmount % recipients.length;
    setRecipients((prev) =>
      prev.map((r, idx) => ({
        ...r,
        amount: idx === 0 ? baseShare + remainder : baseShare,
      }))
    );
  };

  return (
    <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-700/70 p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Top Header & Preset Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              Stealth Disbursement Studio
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">
            Construct confidential payroll batches. Individual payouts are isolated in ZK witnesses.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider whitespace-nowrap">
            Presets:
          </span>
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap border ${
                selectedPresetId === preset.id
                  ? 'bg-emerald-neon/15 border-emerald-neon/60 text-emerald-neon shadow-neon-emerald'
                  : 'bg-charcoal-950/70 border-charcoal-800 text-charcoal-500 hover:text-white hover:border-charcoal-700'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Inputs: Disbursal Pool & Batch Memo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Disbursal Pool (Public Ledger Target) */}
        <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-neon" />
              <span>Public Disbursal Pool (tDUST)</span>
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 font-mono">
              Public Ledger Disclosed
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={poolAmount || ''}
              onChange={(e) => setPoolAmount(Number(e.target.value) || 0)}
              placeholder="e.g. 48500"
              className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white font-mono text-lg font-bold focus:outline-none focus:border-cyan-neon transition"
            />
            <button
              type="button"
              onClick={handleAutoBalancePool}
              className="absolute right-3 top-2.5 text-[11px] px-2 py-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-500 hover:text-white transition font-mono"
              title="Set to sum of recipient amounts"
            >
              Auto-Match Sum
            </button>
          </div>
        </div>

        {/* Batch Memo / Title */}
        <div className="p-4 rounded-2xl bg-charcoal-950/80 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Batch Description / Memo
            </label>
            <span className="text-[10px] text-charcoal-500 font-mono">
              On-Chain Reference
            </span>
          </div>
          <input
            type="text"
            value={batchMemo}
            onChange={(e) => setBatchMemo(e.target.value)}
            placeholder="e.g. Core Engineering Sprint Payout"
            className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white text-sm focus:outline-none focus:border-emerald-neon transition"
          />
        </div>

      </div>

      {/* Recipient Line Items Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              Recipient Allocation Witness Vectors ({recipients.length}/8)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono">
              🔒 Shielded Witness Layer
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleEqualSplit}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-charcoal-300 hover:text-cyan-neon text-xs font-semibold border border-charcoal-750 transition"
              title="Split pool amount equally across all recipients"
            >
              <span>Split Equally</span>
            </button>
            <button
              onClick={handleAddRecipient}
              disabled={recipients.length >= 8}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-neon/15 hover:bg-emerald-neon/25 text-emerald-neon text-xs font-semibold border border-emerald-neon/30 transition disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recipient</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-2xl border border-charcoal-800 bg-charcoal-950/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-900/90 text-charcoal-500 uppercase font-mono tracking-wider border-b border-charcoal-800">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Recipient Name / Role</th>
                <th className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <span>Midnight Address</span>
                    <span className="text-[9px] text-emerald-neon">🔒 Witness</span>
                  </div>
                </th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <span>Amount (tDUST)</span>
                    <span className="text-[9px] text-emerald-neon">🔒 Witness</span>
                  </div>
                </th>
                <th className="py-3 px-4">Pool %</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/80 font-mono">
              {recipients.map((recipient, idx) => {
                const sharePercent = poolAmount > 0 ? ((recipient.amount / poolAmount) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={recipient.id} className="hover:bg-charcoal-900/50 transition">
                    <td className="py-3 px-4 text-charcoal-500 font-mono">{idx + 1}</td>
                    
                    {/* Name & Role */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={recipient.name}
                        onChange={(e) => handleUpdateRecipient(recipient.id, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-charcoal-900 border border-charcoal-750 text-white font-sans focus:outline-none focus:border-emerald-neon"
                      />
                    </td>

                    {/* Midnight Bech32 Address */}
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={recipient.address}
                          onChange={(e) => handleUpdateRecipient(recipient.id, 'address', e.target.value)}
                          className="w-48 sm:w-60 px-2.5 py-1.5 rounded-lg bg-charcoal-900 border border-charcoal-750 text-charcoal-500 font-mono text-[11px] focus:outline-none focus:border-emerald-neon"
                        />
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={recipient.department}
                        onChange={(e) => handleUpdateRecipient(recipient.id, 'department', e.target.value)}
                        className="w-32 px-2.5 py-1.5 rounded-lg bg-charcoal-900 border border-charcoal-750 text-charcoal-500 font-sans focus:outline-none focus:border-emerald-neon"
                      />
                    </td>

                    {/* Amount in tDUST */}
                    <td className="py-3 px-4">
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          value={recipient.amount || ''}
                          onChange={(e) => handleUpdateRecipient(recipient.id, 'amount', Number(e.target.value) || 0)}
                          className="w-28 px-2.5 py-1.5 rounded-lg bg-charcoal-900 border border-emerald-neon/40 text-emerald-neon font-mono font-bold focus:outline-none focus:border-emerald-neon"
                        />
                      </div>
                    </td>

                    {/* Share Percentage */}
                    <td className="py-3 px-4 text-charcoal-500 font-mono">
                      {sharePercent}%
                    </td>

                    {/* Delete action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRemoveRecipient(recipient.id)}
                        disabled={recipients.length <= 1}
                        className="p-1.5 rounded-lg text-charcoal-500 hover:text-rose-neon hover:bg-rose-neon/10 transition disabled:opacity-20"
                        title="Remove recipient"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solvency Calculation & Mathematical Integrity Status */}
      <div className="p-5 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {isSolvent ? (
              <div className="p-2 rounded-xl bg-emerald-neon/15 text-emerald-neon border border-emerald-neon/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-amber-neon/15 text-amber-neon border border-amber-neon/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                {isSolvent
                  ? 'Cryptographic Solvency Satisfied: ∑(w_i) == Pool'
                  : 'Solvency Discrepancy Detected'}
              </div>
              <p className="text-[11px] text-charcoal-500">
                {isSolvent
                  ? 'Private witness sum matches public pool. Zero-Knowledge proof will verify with 100% solvency.'
                  : `Sum mismatch: Recipient allocations total ${calculatedSum.toLocaleString()} tDUST, but Disbursal Pool is ${poolAmount.toLocaleString()} tDUST (Delta: ${delta > 0 ? `+${delta}` : delta}).`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="text-right">
              <div className="text-[10px] text-charcoal-500">Witness Sum</div>
              <div className="text-white font-bold">{calculatedSum.toLocaleString()} tDUST</div>
            </div>
            <div className="text-charcoal-600 font-bold">=</div>
            <div className="text-right">
              <div className="text-[10px] text-charcoal-500">Public Pool</div>
              <div className="text-cyan-neon font-bold">{poolAmount.toLocaleString()} tDUST</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-charcoal-800/80">
          <div className="flex items-center space-x-2 text-xs text-charcoal-500">
            <ShieldCheck className="w-4 h-4 text-emerald-neon" />
            <span>Witness allocations never touch the public mempool or block headers.</span>
          </div>

          <button
            onClick={onExecute}
            disabled={!canExecute}
            className={`flex items-center justify-center space-x-3 px-8 py-3.5 rounded-2xl font-bold font-mono text-sm transition ${
              canExecute
                ? 'bg-gradient-to-r from-emerald-neon via-emerald-glow to-cyan-neon text-charcoal-950 shadow-neon-emerald hover:opacity-95 cursor-pointer scale-100 hover:scale-[1.01]'
                : 'bg-charcoal-800 text-charcoal-600 border border-charcoal-700/60 cursor-not-allowed'
            }`}
          >
            <span>Execute Stealth Payout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
