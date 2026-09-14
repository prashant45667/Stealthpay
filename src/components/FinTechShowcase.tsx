'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  Check, 
  MoreHorizontal, 
  Sparkles,
  ChevronDown,
  Lock,
  Eye,
  CreditCard,
  TrendingUp,
  Activity,
  Globe,
  CircleDot
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface FinTechShowcaseProps {
  onLaunchStudio: () => void;
  onInspectCircuit: () => void;
  vaultBalance: number;
}

export const FinTechShowcase: React.FC<FinTechShowcaseProps> = ({
  onLaunchStudio,
  onInspectCircuit,
  vaultBalance,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  return (
    <div className="w-full space-y-16">
      
      {/* 1. HERO SECTION: Architectural Ribbed Curtain & Pedestal Stage */}
      <section className="relative w-full rounded-3xl overflow-hidden border border-white/10 fluted-curtain-bg fluted-curtain-vignette pt-12 pb-16 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        
        {/* Simple Trust Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-onyx-950/80 border border-white/10 text-xs font-mono text-onyx-300 shadow-lg backdrop-blur-md mb-6 hover:border-emerald-neon/40 transition">
          <span className="text-emerald-neon text-xs">✦</span>
          <span className="tracking-wider uppercase text-[11px] font-semibold text-onyx-200">
            SIMPLE TRUST & PRIVACY
          </span>
        </div>

        {/* Center Display Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.12] text-white max-w-3xl font-display">
          Where Digital Finance <br />
          <span className="text-gradient-silver font-normal">Finds Sanctuary Online</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-onyx-300 max-w-xl font-sans font-light leading-relaxed">
          Experience Seamless, Secure Transactions And Embrace The Future Of Finance With StealthPay Today.
        </p>

        {/* 3D Illuminated Pedestal Stage Graphic */}
        <div className="relative mt-12 w-full max-w-2xl h-64 sm:h-72 flex items-center justify-center">
          
          {/* Vertical Ribbed Lighting Lines */}
          <div className="absolute inset-0 flex justify-around opacity-30 pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-white/10 via-white/40 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-white/15 via-white/50 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-white/20 via-white/60 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-white/15 via-white/50 to-transparent" />
            <div className="w-px h-full bg-gradient-to-b from-white/10 via-white/40 to-transparent" />
          </div>

          {/* Floating Glass Plates in 3D Perspective */}
          <div className="absolute top-6 w-48 sm:w-64 h-24 sm:h-32 pedestal-layer-floating rounded-2xl flex items-center justify-center z-20 transition-transform duration-700 hover:scale-105">
            <div className="text-[10px] font-mono text-onyx-300 uppercase tracking-widest flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-pulse" />
              <span>Zero-Knowledge Shield</span>
            </div>
          </div>

          {/* Glowing Pedestal Base Platform */}
          <div className="absolute bottom-4 w-64 sm:w-96 h-20 sm:h-24 pedestal-stage rounded-xl flex flex-col justify-end p-2 z-10">
            {/* Illuminated Rim Line */}
            <div className="w-full h-1 bg-white rounded-full pedestal-rim-glow mb-2" />
            <div className="w-full h-1 bg-white/40 rounded-full blur-xs" />
          </div>

          {/* Mouse Scroll Indicator */}
          <button 
            onClick={onLaunchStudio}
            className="absolute -bottom-4 z-30 flex flex-col items-center space-y-1 text-onyx-400 hover:text-white transition group"
            title="Scroll to studio"
          >
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-emerald-neon transition">
              <div className="w-1 h-2 rounded-full bg-white group-hover:bg-emerald-neon animate-bounce" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-onyx-400 group-hover:text-emerald-neon transition" />
          </button>

        </div>

      </section>

      {/* 2. SPLIT SECTION: Transform Your Wealth & Finance Management Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline, CTAs, and Partner Logos */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-onyx-900 border border-white/10 text-xs font-mono text-onyx-300">
            <span className="text-emerald-neon text-xs">✦</span>
            <span className="uppercase text-[11px] font-semibold text-onyx-200">SIMPLE TRUST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white font-display">
            Transform Your <br />
            <span className="text-gradient-silver font-semibold">Wealth With StealthPay®</span>
          </h2>

          <p className="text-sm sm:text-base text-onyx-300 font-sans font-light leading-relaxed max-w-lg">
            We Employ Cutting-Edge Zero-Knowledge Encryption Technologies To Safeguard Your Digital Assets With Midnight Solutions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onLaunchStudio}
              className="px-6 py-3 rounded-full bg-white text-onyx-950 font-bold text-xs hover:bg-neutral-200 transition shadow-lg flex items-center space-x-2"
            >
              <span>Get Started For Free</span>
              <span className="text-sm">→</span>
            </button>

            <button
              onClick={onInspectCircuit}
              className="px-6 py-3 rounded-full bg-onyx-900 border border-white/15 hover:border-white/30 text-white text-xs font-mono transition flex items-center space-x-2"
            >
              <span>See How It Works</span>
              <span className="text-emerald-neon">⊙</span>
            </button>
          </div>

          {/* Trusted By Logos Bar */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="text-[11px] font-mono text-onyx-500 uppercase tracking-wider">
              Trusted by many
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono font-bold text-onyx-400">
              <span className="hover:text-white transition flex items-center space-x-1">
                <span className="text-emerald-neon">✦</span>
                <span>MIDNIGHT</span>
              </span>
              <span className="hover:text-white transition">DASHLANE</span>
              <span className="hover:text-white transition">LACE WALLET</span>
              <span className="hover:text-white transition">+ CARDANO</span>
            </div>
          </div>

        </div>

        {/* Right Column: Finance Management Chart Card */}
        <div className="lg:col-span-6">
          <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white font-display">Finance Management</h3>
                <div className="flex items-center space-x-4 mt-1.5 text-xs font-mono">
                  <span className="flex items-center space-x-1.5 text-onyx-400">
                    <span className="w-3 h-0.5 bg-onyx-500 rounded-full" />
                    <span>Last Week</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-emerald-neon">
                    <span className="w-3 h-0.5 bg-emerald-neon rounded-full" />
                    <span>This Week</span>
                  </span>
                </div>
              </div>

              <button className="p-2 rounded-xl bg-onyx-900 border border-white/5 text-onyx-400 hover:text-white transition">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Vertical Rounded Bars Chart */}
            <div className="relative pt-6 pb-2">
              <div className="flex items-end justify-between h-48 sm:h-52 px-2 border-b border-white/5 pb-4">
                
                {/* 16K scale label */}
                <div className="absolute left-0 top-0 text-[10px] font-mono text-onyx-500">16K</div>
                <div className="absolute left-0 top-1/2 text-[10px] font-mono text-onyx-500">8K</div>
                <div className="absolute left-0 bottom-4 text-[10px] font-mono text-onyx-500">2K</div>

                {/* Column 1 */}
                <div className="flex items-end space-x-2 pl-6">
                  <div className="w-4 sm:w-6 h-20 rounded-full bg-onyx-800" />
                  <div className="w-4 sm:w-6 h-28 rounded-full bg-gradient-to-t from-emerald-neon/40 to-emerald-neon" />
                </div>

                {/* Column 2 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-16 rounded-full bg-onyx-800" />
                  <div className="w-4 sm:w-6 h-36 rounded-full bg-gradient-to-t from-emerald-neon/40 to-emerald-neon" />
                </div>

                {/* Column 3 - With Floating Metric Badge */}
                <div className="relative flex items-end space-x-2">
                  {/* Floating Pill Tag */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-onyx-950 border border-emerald-neon/40 text-[10px] font-mono text-emerald-neon font-bold shadow-lg whitespace-nowrap z-10 flex flex-col items-center">
                    <span>+ 4.8%</span>
                    <span className="text-[9px] text-cyan-neon font-normal">- 2.6%</span>
                  </div>
                  <div className="w-4 sm:w-6 h-24 rounded-full bg-onyx-800" />
                  <div className="w-4 sm:w-6 h-44 rounded-full bg-gradient-to-t from-emerald-neon to-cyan-neon shadow-neon-emerald" />
                </div>

                {/* Column 4 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-32 rounded-full bg-onyx-800" />
                  <div className="w-4 sm:w-6 h-38 rounded-full bg-gradient-to-t from-emerald-neon/40 to-emerald-neon" />
                </div>

                {/* Column 5 */}
                <div className="flex items-end space-x-2">
                  <div className="w-4 sm:w-6 h-28 rounded-full bg-onyx-800" />
                  <div className="w-4 sm:w-6 h-40 rounded-full bg-gradient-to-t from-emerald-neon/40 to-emerald-neon" />
                </div>

              </div>

              {/* Bottom stats row */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-onyx-400">
                <span>Vault Active: <strong className="text-white" suppressHydrationWarning>{formatNumber(vaultBalance)} tDUST</strong></span>
                <span className="text-emerald-neon font-bold">100% Shielded</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. BENTO GRID SHOWCASE CARDS (Matching Screenshot) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento 1: Growth with New Series (Top Left) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white font-display">
              Growth with <br />
              <span className="text-gradient-silver font-normal">New Stealth Series,</span>
            </h4>
            <p className="text-xs text-onyx-400 font-light">
              With our forward-thinking approach brings a whole new area for confidential batch payroll.
            </p>
          </div>

          {/* Mini Bar Chart with Apr Indicator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-end justify-between h-20 px-2 border-b border-white/5 pb-2">
              <div className="text-center">
                <div className="w-4 h-8 rounded-full bg-onyx-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Feb</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-12 rounded-full bg-onyx-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Mar</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-16 rounded-full bg-emerald-neon mx-auto shadow-neon-emerald" />
                <div className="text-[10px] text-emerald-neon font-mono font-bold mt-1">Apr</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-10 rounded-full bg-onyx-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">May</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-14 rounded-full bg-onyx-800 mx-auto" />
                <div className="text-[10px] text-onyx-500 font-mono mt-1">Jun</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-emerald-neon/10 border border-emerald-neon/30 text-emerald-neon font-bold text-[11px]">
                +17% Improvement
              </span>
              <span className="text-onyx-400">ZK Efficiency</span>
            </div>
          </div>
        </div>

        {/* Bento 2: Join The Ecosystem 3D Orbit (Top Center/Right) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-onyx-900 border border-white/10 text-[10px] font-mono text-onyx-400">
              <span>● Ecosystem</span>
            </div>
            <h4 className="text-lg font-semibold text-white font-display">Join The Ecosystem</h4>
            <p className="text-xs text-onyx-400 font-light">
              Move your financial transactions across different accounts with cryptographic protection.
            </p>
          </div>

          {/* 3D Orbit Graphics */}
          <div className="relative h-28 flex items-center justify-center overflow-hidden">
            {/* Glowing Center Sphere */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-neon to-cyan-neon shadow-neon-emerald animate-pulse-glow" />
            
            {/* Orbital Rings */}
            <div className="absolute w-28 h-12 border border-white/20 rounded-full transform -rotate-12 animate-float-orb" />
            <div className="absolute w-36 h-16 border border-emerald-neon/30 rounded-full transform rotate-45" />
          </div>
        </div>

        {/* Bento 3: DeFi App Pro+ Status Card (Top Right) */}
        <div className="md:col-span-4 luxury-card rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-onyx-900 border border-white/10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-emerald-neon" />
              </div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                DEFI APP PRO+
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-neon px-2 py-0.5 rounded-full bg-emerald-neon/10">
              ACTIVE
            </span>
          </div>

          {/* Shielded Address Checklist */}
          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex items-center space-x-2 p-2 rounded-xl bg-onyx-950/80 border border-white/5 text-onyx-300">
              <Check className="w-3.5 h-3.5 text-emerald-neon flex-shrink-0" />
              <span className="truncate">0X036547UTY42FF780XX00</span>
            </div>

            <div className="flex items-center space-x-2 p-2 rounded-xl bg-onyx-950/80 border border-white/5 text-onyx-300">
              <Check className="w-3.5 h-3.5 text-emerald-neon flex-shrink-0" />
              <span className="truncate">0X09603T6565FMY9D7ZXX009</span>
            </div>

            <div className="flex items-center space-x-2 p-2 rounded-xl bg-emerald-neon/5 border border-emerald-neon/20 text-emerald-neon">
              <span className="w-2 h-2 rounded-full bg-emerald-neon animate-ping flex-shrink-0" />
              <span>CHECKING COMPACT ZK...</span>
            </div>
          </div>
        </div>

        {/* Bento 4: Get Magic Cards (Bottom Left / 6 cols) */}
        <div className="md:col-span-6 luxury-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-3 max-w-xs">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-onyx-900 border border-white/10 text-[10px] font-mono text-onyx-400">
              <span>✦ Magic Cards</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-semibold text-white font-display">
              Get Magic Cards
            </h4>
            <p className="text-xs text-onyx-400 font-light leading-relaxed">
              We offer seamless integration with various financial institutions and Midnight private smart contracts.
            </p>
          </div>

          {/* Stacked Obsidian Cards in Perspective */}
          <div className="relative w-48 h-32 stealth-card-stack flex-shrink-0">
            {/* Card 1 (Back) */}
            <div className="absolute top-0 right-4 w-36 h-24 rounded-xl stealth-card-item opacity-40 transform rotate-12" />
            {/* Card 2 (Middle) */}
            <div className="absolute top-2 right-2 w-36 h-24 rounded-xl stealth-card-item opacity-70 transform rotate-6" />
            {/* Card 3 (Front) */}
            <div className="absolute top-4 right-0 w-36 h-24 rounded-xl stealth-card-item p-3 flex flex-col justify-between shadow-2xl border border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-emerald-neon font-bold">✦ StealthPay</span>
                <div className="w-3 h-2 rounded-sm bg-yellow-500/80" />
              </div>
              <div className="text-[10px] font-mono text-white tracking-widest">•••• 8492</div>
            </div>
          </div>
        </div>

        {/* Bento 5: Secure with 2 Factor / ZK Proofs (Bottom Right / 6 cols) */}
        <div className="md:col-span-6 luxury-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-onyx-900 border border-emerald-neon/30 text-[10px] font-mono text-emerald-neon">
              <span>• Secure</span>
            </div>
            <span className="text-xs font-mono text-onyx-400">Halo2 / PLONK</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-semibold text-white font-display">
              Secure with Zero-Knowledge
            </h4>
            <p className="text-xs text-onyx-400 font-light leading-relaxed max-w-md">
              This feature enables encrypted verification, private balance tracking, and automated cryptographic solvency reconciliation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-onyx-950 border border-white/5">
              <div className="text-[10px] text-onyx-400 uppercase font-mono">Proof Verification</div>
              <div className="text-sm font-bold font-mono text-emerald-neon mt-0.5">100% Private</div>
            </div>
            <div className="p-3 rounded-2xl bg-onyx-950 border border-white/5">
              <div className="text-[10px] text-onyx-400 uppercase font-mono">Prover Latency</div>
              <div className="text-sm font-bold font-mono text-cyan-neon mt-0.5">1.82s Real-Time</div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
