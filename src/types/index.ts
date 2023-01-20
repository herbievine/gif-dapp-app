import type { Wallet } from "@project-serum/anchor";

export interface Solana extends Wallet {
  isPhantom: boolean;
  connect: (config: { onlyIfTrusted: boolean }) => Promise<{
    publicKey: string;
  }>;
  disconnect: () => Promise<void>;
}

declare global {
  interface Window {
    solana: Solana;
    Buffer: typeof Buffer;
  }
}
