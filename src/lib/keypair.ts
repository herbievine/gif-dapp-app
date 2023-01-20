import { _keypair } from "../assets/keypair.json";
import { web3 } from "@project-serum/anchor";

const getKeyPair = async () => {
  const arr = Object.values(_keypair.secretKey);
  const secret = new Uint8Array(arr);

  return web3.Keypair.fromSecretKey(secret);
};

export { getKeyPair };
