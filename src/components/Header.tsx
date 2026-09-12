'use client';

import React, { useState, useEffect } from 'react';
import { WalletAccount } from '@/types';
import { midnightConnector } from '@/lib/midnight/connector';
import { formatNumber } from '@/lib/utils';
import { Shield, Wallet, ChevronDown, Copy, Check, ExternalLink, Activity, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenDeposit: () => void;
  vaultBalance: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDeposit, vaultBalance }) => {
  const [account, setAccount] = useState<WalletAccount>(midnightConnector.getAccount());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [blockHeight, setBlockHeight] = useState(1849242);

  useEffect(() => {
    const unsubscribe = midnightConnector.subscribe((acc) => {
      setAccount(acc);
    });

    // Simulate subtle block pulse
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + Math.floor(Math.random() * 2));
    }, 12000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleCopy = () => {
    if (account.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async () => {
    await midnightConnector.connectLace();
    setDropdownOpen(false);
  };

  const handleDisconnect = () => {
    midnightConnector.disconnect();
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-700/60 bg-charcoal-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-neon to-cyan-neon rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-12 h-12 bg-charcoal-900 border border-emerald-neon/40 rounded-xl flex items-center justify-center shadow-neon-emerald">
              <Shield className="w-6 h-6 text-emerald-neon" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl font-bold tracking-tight text-white font-mono">
                Stealth<span className="text-emerald-neon">Pay</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-emerald-neon/10 border border-emerald-neon/30 text-emerald-neon rounded-full">
                Midnight Preprod
              </span>
            </div>
            <p className="text-xs text-charcoal-500 font-medium">
              Confidential Split & Payroll Protocol
            </p>
          </div>
        </div>

        {/* Center Live Network & Vault Stats */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Network Sync Pill */}
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-charcoal-700/70 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-neon"></span>
            </span>
            <span className="text-charcoal-500">Network:</span>
            <span className="text-emerald-neon font-mono font-medium">Midnight Preprod</span>
            <span className="text-charcoal-600">|</span>
            <span className="text-charcoal-500">Block</span>
            <span className="text-white font-mono" suppressHydrationWarning>#{formatNumber(blockHeight)}</span>
          </div>

          {/* Quick Treasury Vault Pill */}
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-emerald-dark/60 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-neon" />
            <span className="text-charcoal-500">Treasury Vault:</span>
            <span className="text-emerald-neon font-mono font-bold" suppressHydrationWarning>
              {formatNumber(vaultBalance)} tDUST
            </span>
            <button
              onClick={onOpenDeposit}
              className="text-[11px] px-2 py-0.5 rounded bg-emerald-neon/15 hover:bg-emerald-neon/25 text-emerald-neon font-medium transition"
            >
              + Deposit
            </button>
          </div>
        </div>

        {/* Right: Lace Wallet Connect */}
        <div className="relative">
          {account.isConnected ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-charcoal-900 border border-emerald-neon/30 hover:border-emerald-neon/60 transition shadow-sm text-sm"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-neon shadow-neon-emerald"></div>
                <div className="text-left font-mono">
                  <div className="text-xs text-charcoal-500">Lace Midnight</div>
                  <div className="text-white font-medium text-xs">
                    {account.bech32Address}
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-charcoal-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Details */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-charcoal-900 border border-charcoal-700/80 shadow-2xl p-4 z-50 backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
                    <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                      Connected Wallet
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono">
                      Preprod
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="text-[11px] text-charcoal-500">Account Address</div>
                      <div className="flex items-center justify-between mt-1 p-2 rounded-lg bg-charcoal-950 font-mono text-xs text-charcoal-500 break-all">
                        <span className="truncate mr-2">{account.address}</span>
                        <button
                          onClick={handleCopy}
                          className="p-1 hover:text-emerald-neon text-charcoal-500 transition"
                          title="Copy address"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-neon" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-charcoal-950/80 border border-charcoal-800">
                        <div className="text-[10px] text-charcoal-500">tDUST Balance</div>
                        <div className="text-sm font-bold font-mono text-emerald-neon mt-0.5" suppressHydrationWarning>
                          {formatNumber(account.balance)}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-charcoal-950/80 border border-charcoal-800">
                        <div className="text-[10px] text-charcoal-500">NIGHT Balance</div>
                        <div className="text-sm font-bold font-mono text-cyan-neon mt-0.5" suppressHydrationWarning>
                          {formatNumber(account.dustBalance)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between">
                    <button
                      onClick={handleConnect}
                      className="text-xs text-charcoal-500 hover:text-white flex items-center space-x-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Switch Account</span>
                    </button>
                    <button
                      onClick={handleDisconnect}
                      className="text-xs text-rose-glow hover:text-rose-neon font-medium"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-neon to-cyan-neon text-charcoal-950 font-semibold text-sm hover:opacity-95 shadow-neon-emerald transition"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Lace Wallet</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
