'use client';

import React, { useState } from 'react';
import { BatchRecord } from '@/types';
import { formatNumber } from '@/lib/utils';
import { Layers, ShieldCheck, ExternalLink, Copy, Check, Lock, ChevronRight, Hash, Download } from 'lucide-react';

interface TransactionLogProps {
  history: BatchRecord[];
}

export const TransactionLog: React.FC<TransactionLogProps> = ({ history }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = ['Batch ID', 'Memo', 'Disbursed Pool (tDUST)', 'Recipients', 'Merkle Root', 'Block Height', 'Status', 'TX Hash', 'Timestamp'];
    const rows = history.map((b) => [
      b.batchId,
      `"${b.memo || 'Stealth Payroll'}"`,
      b.totalAmount,
      b.recipientCount,
      b.solvencyMerkleRoot,
      b.blockHeight,
      b.status,
      b.txHash,
      new Date(b.timestamp).toISOString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stealthpay_payroll_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-3xl bg-charcoal-900/90 border border-charcoal-700/70 p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              Encrypted Midnight Payroll Ledger Log
            </h2>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">
            Real-time public record of verified zero-knowledge batch settlements on Midnight Preprod.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 text-charcoal-300 hover:text-emerald-neon border border-charcoal-800 text-xs font-mono transition"
            title="Export payroll receipts as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <span className="text-xs font-mono text-charcoal-500">
            Total Batches: <span className="text-white font-bold">{history.length}</span>
          </span>
        </div>
      </div>

      {/* Table of Batches */}
      <div className="overflow-x-auto rounded-2xl border border-charcoal-800 bg-charcoal-950/60">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-charcoal-900/90 text-charcoal-500 uppercase tracking-wider border-b border-charcoal-800">
            <tr>
              <th className="py-3 px-4">Batch ID / Description</th>
              <th className="py-3 px-4">Disbursed Pool</th>
              <th className="py-3 px-4">Recipients</th>
              <th className="py-3 px-4">Merkle Root</th>
              <th className="py-3 px-4">Block #</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Explorer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-800/80">
            {history.map((batch) => {
              const formattedDate = new Date(batch.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <tr key={batch.batchId} className="hover:bg-charcoal-900/50 transition">
                  {/* Batch ID & Memo */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-neon" />
                      <div>
                        <div className="text-white font-sans font-medium text-xs">
                          {batch.memo || 'Stealth Payroll'}
                        </div>
                        <div className="text-[11px] text-charcoal-500 flex items-center space-x-1 mt-0.5">
                          <span>{batch.batchId.slice(0, 16)}...</span>
                          <button
                            onClick={() => handleCopy(batch.batchId, batch.batchId)}
                            className="text-charcoal-500 hover:text-emerald-neon transition"
                          >
                            {copiedId === batch.batchId ? (
                              <Check className="w-3 h-3 text-emerald-neon" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Disbursed Amount */}
                  <td className="py-3.5 px-4">
                    <div className="text-white font-bold" suppressHydrationWarning>
                      {formatNumber(batch.totalAmount)} tDUST
                    </div>
                    <div className="text-[10px] text-emerald-neon">100% Solvency</div>
                  </td>

                  {/* Recipients */}
                  <td className="py-3.5 px-4 text-charcoal-500">
                    <span className="text-cyan-neon font-bold">{batch.recipientCount}</span> Private Witness
                  </td>

                  {/* Merkle Root */}
                  <td className="py-3.5 px-4 text-charcoal-500">
                    <div className="truncate w-28 text-[11px]">
                      {batch.solvencyMerkleRoot}
                    </div>
                  </td>

                  {/* Block Height */}
                  <td className="py-3.5 px-4 text-charcoal-500" suppressHydrationWarning>
                    #{formatNumber(batch.blockHeight)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 text-[10px] font-bold uppercase">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{batch.status}</span>
                    </span>
                  </td>

                  {/* Explorer Link */}
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`https://preprod.midnight.network/tx/${batch.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-charcoal-500 hover:text-emerald-neon transition"
                      title="View on Midnight Preprod Explorer"
                    >
                      <span className="text-[11px]">Inspect</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-charcoal-500 font-mono">
        <span>Ledger State: Compact Contract Verified</span>
        <span>Replay Protection: Unique Batch UUID & Hash Registry</span>
      </div>

    </div>
  );
};
