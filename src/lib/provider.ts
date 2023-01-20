import { Connection, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider } from "@project-serum/anchor";

const getProvider = () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const provider = new AnchorProvider(connection, window.solana, {
    preflightCommitment: "confirmed",
  });

  return provider;
};

export { getProvider };
