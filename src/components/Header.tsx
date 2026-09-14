'use client';

import React, { useState, useEffect } from 'react';
import { WalletAccount } from '@/types';
import { midnightConnector } from '@/lib/midnight/connector';
import { formatNumber } from '@/lib/utils';
import { 
  Shield, 
  Wallet, 
  ChevronDown, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  Cpu, 
  Layers, 
  ExternalLink,
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenDeposit: () => void;
  vaultBalance: number;
  activeTab: 'studio' | 'radar' | 'circuit' | 'history';
  setActiveTab: (tab: 'studio' | 'radar' | 'circuit' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenDeposit, 
  vaultBalance,
  activeTab,
  setActiveTab,
}) => {
  const [account, setAccount] = useState<WalletAccount>(midnightConnector.getAccount());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [blockHeight, setBlockHeight] = useState(1849242);

  useEffect(() => {
    const unsubscribe = midnightConnector.subscribe((acc) => {
      setAccount(acc);
    });

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
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="luxury-pill rounded-full p-2 sm:p-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo & Mark */}
        <div className="flex items-center space-x-3 pl-3">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-neon text-base leading-none font-bold">✦</span>
            <span className="text-sm font-bold tracking-tight text-white font-mono flex items-center">
              Stealth<span className="text-emerald-neon">Pay</span>
              <span className="text-[9px] text-onyx-400 font-sans ml-1 uppercase">®</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center space-x-2 pl-3 border-l border-white/10 text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-neon"></span>
            </span>
            <span className="text-onyx-400">Preprod:</span>
            <span className="text-white font-medium" suppressHydrationWarning>#{formatNumber(blockHeight)}</span>
          </div>
        </div>

        {/* Center Floating Pill Navigation */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-onyx-950/70 border border-white/5">
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeTab === 'studio'
                ? 'bg-white text-onyx-950 font-bold shadow-sm'
                : 'text-onyx-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeTab === 'radar'
                ? 'bg-white text-onyx-950 font-bold shadow-sm'
                : 'text-onyx-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('circuit')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeTab === 'circuit'
                ? 'bg-white text-onyx-950 font-bold shadow-sm'
                : 'text-onyx-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>ZK Circuit</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-white text-onyx-950 font-bold shadow-sm'
                : 'text-onyx-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ledger</span>
          </button>
        </nav>

        {/* Right: Vault Pill & Lace Wallet Connect */}
        <div className="flex items-center space-x-2">
          
          {/* Quick Treasury Vault Pill */}
          <button
            onClick={onOpenDeposit}
            className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-onyx-900 border border-emerald-neon/20 hover:border-emerald-neon/40 text-xs font-mono transition group"
            title="Deposit funds into Midnight Treasury Vault"
          >
            <span className="text-onyx-400">Vault:</span>
            <span className="text-emerald-neon font-bold" suppressHydrationWarning>
              {formatNumber(vaultBalance)}
            </span>
            <span className="text-[10px] text-onyx-400 group-hover:text-emerald-neon transition">+</span>
          </button>

          {/* Lace Wallet Pill */}
          <div className="relative">
            {account.isConnected ? (
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-onyx-900 border border-white/10 hover:border-white/20 transition text-xs font-mono"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-neon shadow-neon-emerald"></span>
                  <span className="text-white font-medium text-xs">
                    {account.bech32Address.slice(0, 10)}...{account.bech32Address.slice(-4)}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-onyx-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Details */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl luxury-card p-4 z-50 animate-fade-in shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-neon text-xs">✦</span>
                        <span className="text-xs font-semibold text-onyx-200 uppercase tracking-wider font-mono">
                          Lace Midnight Wallet
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/20 font-mono font-medium">
                        Preprod Testnet
                      </span>
                    </div>

                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-[10px] text-onyx-400 uppercase font-mono">Shielded Address</div>
                        <div className="flex items-center justify-between mt-1 p-2 rounded-xl bg-onyx-950 border border-white/5 font-mono text-[11px] text-onyx-300">
                          <span className="truncate mr-2">{account.address}</span>
                          <button
                            onClick={handleCopy}
                            className="p-1 hover:text-emerald-neon text-onyx-400 transition"
                            title="Copy address"
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-neon" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-onyx-950 border border-white/5">
                          <div className="text-[10px] text-onyx-400 uppercase font-mono">tDUST Liquidity</div>
                          <div className="text-sm font-bold font-mono text-emerald-neon mt-0.5" suppressHydrationWarning>
                            {formatNumber(account.balance)}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-onyx-950 border border-white/5">
                          <div className="text-[10px] text-onyx-400 uppercase font-mono">NIGHT Token</div>
                          <div className="text-sm font-bold font-mono text-cyan-neon mt-0.5" suppressHydrationWarning>
                            {formatNumber(account.dustBalance)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={handleConnect}
                        className="text-xs text-onyx-300 hover:text-white flex items-center space-x-1.5 transition font-mono"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Switch Account</span>
                      </button>
                      <button
                        onClick={handleDisconnect}
                        className="text-xs text-rose-glow hover:text-rose-neon font-mono transition"
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
                className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white text-onyx-950 font-bold text-xs hover:bg-neutral-200 transition shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-onyx-950" />
                <span>Connect Lace</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
