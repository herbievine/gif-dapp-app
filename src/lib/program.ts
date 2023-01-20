import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { getProvider } from "./provider";
import { PROGRAM_ID } from "./constants";

const getProgram = async () => {
  const idl = await Program.fetchIdl(PROGRAM_ID, getProvider());
  if (!idl) {
    throw new Error("Unable to fetch IDL");
  }
  return new Program(idl, PROGRAM_ID, getProvider());
};

export { getProgram };
