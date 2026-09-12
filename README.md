# 🛡️ StealthPay: Confidential Split & Payroll Protocol on Midnight Network

> **Production-Grade, Level-3 Compliant Confidential Payroll & Multi-Party Revenue Split dApp** powered by **Midnight Network Compact Smart Contracts**, **Zero-Knowledge Solvency Proofs**, and **Lace Wallet Connector**.

[![Midnight Preprod](https://img.shields.io/badge/Network-Midnight%20Preprod-00FF9D?style=for-the-badge&logo=shield)](https://midnight.network)
[![Compact Circuit](https://img.shields.io/badge/Smart%20Contract-Compact%20v0.20-00E5FF?style=for-the-badge)](https://docs.midnight.network)
[![Level 3 Compliant](https://img.shields.io/badge/Compliance-Level%203%20dApp-05DF85?style=for-the-badge)](https://midnight.network)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions%20Passing-success?style=for-the-badge&logo=githubactions)](https://github.com/nitinkapoor009988-cloud)

---

## 🌟 Executive Overview & Problem Statement

In Web3 organizations, DAOs, and crypto-native enterprises, **transparent public blockchains force an agonizing trade-off**:
1. **Public mempools leak sensitive financial data**: Anyone can monitor competitor compensation, developer bonuses, executive splits, and contractor rates on public explorers.
2. **Centralized off-chain solutions destroy trust**: Off-chain payroll relies on trusted intermediaries, prone to embezzlement, non-payment, and insolvency.

### 💡 The StealthPay Solution
**StealthPay** solves this dilemma by utilizing the **Midnight Network's Zero-Knowledge Compact Architecture**:
- **Shielded Individual Payouts**: Recipient addresses, individual salary amounts, and department bonus percentages are confined to local **ZK Witnesses** inside the manager's secure enclave.
- **Cryptographic Solvency Verification**: The Compact circuit mathematically verifies that $\sum_{i=1}^{N} \text{Allocation}_i == \text{PublicPoolAmount}$ without exposing individual line-item payouts.
- **Selective Public Disclosure**: The public ledger only records the aggregate pool total, unique batch receipt, and ZK proof, guaranteeing **zero financial snooping** alongside **100% cryptographic solvency**.

---

## 🔐 The Midnight Privacy Model

StealthPay operates on a dual-state architecture enabled by Midnight's Compact language:

```
+-------------------------------------------------------------------------------+
|                       STEALTHPAY PRIVACY ARCHITECTURE                         |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ LOCAL MANAGER ENCLAVE ] (Private Witness Layer - 0 Leaks)                  |
|  * Recipient #1: Elena Rostova    -> 14,000 tDUST  (Salt_01)                  |
|  * Recipient #2: Tariq Al-Mansoor -> 12,500 tDUST  (Salt_02)                  |
|  * Recipient #3: Sarah Chen       ->  9,000 tDUST  (Salt_03)                  |
|  * Recipient #4: Marcus Vance     ->  8,000 tDUST  (Salt_04)                  |
|  * Recipient #5: Aiden Patel      ->  5,000 tDUST  (Salt_05)                  |
|                                                                               |
|                                    │                                          |
|                                    ▼                                          |
|  [ COMPACT ZK-SNARK CIRCUIT ] (Halo2 / PLONK Arithmetization)                 |
|  1. Bounds Check:    ∀ i, 0 < alloc[i] ≤ poolAmount                           |
|  2. Solvency Eq:     ∑(alloc[i]) == 48,500 tDUST                              |
|  3. Merkle Tree:     MerkleRoot(H(addr, alloc, salt)) == Root                 |
|  4. Deliberate:      disclose(poolAmount, batchId, root, status)              |
|                                                                               |
|                                    │                                          |
|                                    ▼                                          |
|  [ MIDNIGHT PREPROD LEDGER ] (Public State Disclosed)                         |
|  * Batch ID:         0xbatch_8f1a2e9d0c3b4a5e...                              |
|  * Disbursed Pool:   48,500 tDUST                                             |
|  * Recipient Count:  5 Nodes Shielded                                         |
|  * Solvency Root:    0xzk_merkle_root_77a1bc...                               |
|  * Status:           100% Cryptographically Solved                            |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Deliberate Use of `disclose()`
In `contracts/stealth_pay.compact`, the `disclose()` operator is restricted strictly to:
1. `publicBatchId`: Unique identifier for replay protection.
2. `publicPoolAmount`: Aggregate disbursed amount subtracted from the public treasury vault.
3. `publicRecipientCount`: Total vector elements processed.
4. `publicMerkleRoot`: Merkle accumulator over recipient commitments.
5. `publicTimestamp`: Ledger timestamp for financial audit logs.

Individual recipient parameters (`address`, `amount`, `salt`) **never pass through `disclose()`**, guaranteeing mathematical privacy.

---

## 🎨 UI Aesthetics & Features

StealthPay features a **FinTech Neon Emerald & Deep Charcoal Design System** (`#080C0E` background, `#00FF9D` mint neon, `#00E5FF` cyber cyan, and frosted dark glass panels).

### Key Features:
- **Lace Wallet Connector**: Seamless connectivity with Lace DApp Connector (Midnight edition) with fallback simulation for hackathon judges.
- **Live Treasury Vault Card**: Real-time vault liquidity balance, all-time confidential disbursed metrics, and fast Halo2 proof latency benchmarks (~1.2s).
- **Stealth Disbursement Studio**:
  - Dynamic recipient allocation table with custom presets (Core Engineering, DAO Bounties, Executive Splits).
  - Clear visual badges distinguishing `[🔒 Private Witness]` from `[🌐 Public Ledger]`.
  - Real-time solvency delta calculator.
- **Multi-Stage ZK Proof Modal**:
  - Step 1: Local Witness Construction & Enclave Protection.
  - Step 2: Zero-Knowledge Solvency Constraint Arithmetization.
  - Step 3: Commitment Merkle Tree Synthesis.
  - Step 4: Compact ZK-SNARK Proof Generation (Halo2).
  - Step 5: Lace DApp Signature & Authorization.
  - Step 6: Midnight Preprod Ledger Consensus Broadcast.
  - Step 7: On-Chain Settlement with TX Explorer link.
- **Privacy Transparency Radar**:
  - Side-by-side interactive comparison showing the **"Public On-Chain Explorer View"** (obfuscated hashes, total sum disclosed) vs the **"Local Manager View"** (decrypted itemized breakdown).
- **Circuit Inspector**: Live validator for the 5 mathematical R1CS constraints enforced inside Compact.
- **Encrypted Transaction History**: Audit log of past payroll batches on Midnight Preprod.

---

## 🏆 Level 3 Product Proposal (Hackathon Submission)

### 1. Project Title
**StealthPay: Confidential Split & Payroll Protocol on Midnight**

### 2. Category & Track
- **Privacy-Preserving DeFi & Enterprise Tools**
- **Midnight Network Level-3 Compliant Decentralized Application**

### 3. Problem Addressed
Transparent public blockchains leak sensitive enterprise payroll and DAO compensation data, exposing team members to financial targeting and competitive espionage. Existing off-chain payroll tools lack cryptographic guarantees of solvency and non-custodial security.

### 4. Innovation & Value Proposition
StealthPay introduces **Confidential Zero-Knowledge Solvency Batching**:
- Combines the privacy of ZK witnesses with the verifiability of a public treasury pool.
- Allows DAOs, Web3 teams, and grant programs to disburse funds confidentially with mathematically guaranteed solvency on Midnight.

### 5. Technical Stack
- **Smart Contract**: Midnight Compact (`contracts/stealth_pay.compact`)
- **ZK Circuit Engine**: Halo2 / PLONK polynomial arithmetization with Pedersen & Poseidon commitments
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Wallet**: Lace DApp Connector (Preprod)
- **Testing**: Vitest (6 Unit & Integration Tests)
- **CI/CD**: GitHub Actions automated pipeline

---

## 📁 Project Structure

```
StealthPay/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI/CD pipeline
├── contracts/
│   └── stealth_pay.compact        # Midnight Compact ZK smart contract
├── src/
│   ├── app/
│   │   ├── globals.css            # Neon Emerald theme & styling
│   │   ├── layout.tsx             # Next.js root layout
│   │   └── page.tsx               # Main application page
│   ├── components/
│   │   ├── CircuitVisualizer.tsx  # Compact R1CS constraint inspector
│   │   ├── DepositModal.tsx       # Treasury vault deposit modal
│   │   ├── DisbursementStudio.tsx # Dynamic payroll allocation workspace
│   │   ├── Header.tsx             # Navigation & Lace wallet bridge
│   │   ├── PrivacyRadar.tsx       # Side-by-side public vs private radar
│   │   ├── ProofGenerationModal.tsx # Multi-step live ZK proof modal
│   │   ├── TransactionLog.tsx     # Verified ledger history table
│   │   └── TreasuryPoolCard.tsx   # Protocol vault metrics
│   ├── lib/
│   │   ├── midnight/
│   │   │   ├── connector.ts       # Lace DApp connector bridge
│   │   │   └── stealth-service.ts # ZK solvency proof engine
│   │   └── presets.ts             # Preset payroll templates
│   └── types/
│       └── index.ts               # TypeScript interfaces
├── tests/
│   └── stealth_pay.test.ts        # Comprehensive Vitest test suite
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Lace Wallet Extension** (Optional, integrated simulator active by default)

### 1. Clone Repository
```bash
git clone https://github.com/nitinkapoor009988-cloud/StealthPay.git
cd StealthPay
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Execute Unit & Integration Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## 🧪 Test Suite Coverage

StealthPay includes 6 automated tests in `tests/stealth_pay.test.ts`:
1. **Mathematical Solvency Equality Verification**: Asserts $\sum \text{alloc}_i == \text{poolAmount}$ updates state and mints a verified batch.
2. **Private Witness Isolation**: Asserts that individual salary data is omitted from public on-chain records.
3. **Batch Disbursal State Transitions**: Asserts `batchCounter` increments and ledger history updates.
4. **Insolvent Disbursal Rejection**: Asserts sum mismatch triggers a circuit error.
5. **Bounds & Overflow Constraints**: Asserts batches $> 8$ or empty batches are rejected.
6. **Commitment & Merkle Determinism**: Asserts reproducible cryptographic hashes.

---

## 👤 Author & GitHub Details

| Field | Details |
|---|---|
| **Author / Developer** | [Nitin Kapoor (nitinkapoor009988-cloud)](https://github.com/nitinkapoor009988-cloud) |
| **GitHub Profile** | [https://github.com/nitinkapoor009988-cloud](https://github.com/nitinkapoor009988-cloud) |
| **Project Repository** | [https://github.com/nitinkapoor009988-cloud/StealthPay](https://github.com/nitinkapoor009988-cloud/StealthPay) |
| **Target Network** | Midnight Preprod Testnet |
| **Contract Language** | Midnight Compact (`v0.20+`) |
| **License** | MIT Open Source License |

---

## 🛡️ License

MIT License — Developed for the Midnight Network Ecosystem by [nitinkapoor009988-cloud](https://github.com/nitinkapoor009988-cloud).

