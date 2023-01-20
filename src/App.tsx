import React, { useEffect, useState } from "react";
import { Solana } from "./types";
import { getProgram } from "./lib/program";
import { getKeyPair } from "./lib/keypair";
import { displayAddress } from "./lib/address";
import { getProvider } from "./lib/provider";
import { PublicKey } from "@solana/web3.js";

type AppProps = React.PropsWithChildren<{}>;

const App = ({}: AppProps) => {
  const [provider, setProvider] = useState<Solana | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [gifs, setGifs] = useState<{ url: string; userAddress: PublicKey }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    if (window.solana) {
      const { publicKey } = await window.solana.connect({
        onlyIfTrusted: false,
      });

      setProvider(window.solana);
      setAddress(publicKey.toString());
    }
  };

  const disconnect = async () => {
    if (provider) {
      await provider.disconnect();
      setProvider(null);
      setAddress(null);
      setGifs([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const getGifList = async () => {
    setIsLoading(true);

    try {
      const program = await getProgram();
      const { gifs } = await program.account.baseAccount.fetch(
        (
          await getKeyPair()
        ).publicKey
      );

      setGifs(gifs);
    } catch (error) {
      console.error("Error in fetching GIFs:\n", error);
      setGifs([]);
    }

    setIsLoading(false);
  };

  const handleAddGif = async () => {
    setIsLoading(true);

    if (!input.match(/https:\/\/media\.giphy\.com\/media\/[\w\d]+/)) {
      setIsLoading(false);
      return;
    }

    try {
      const program = await getProgram();
      const provider = getProvider();

      await program.rpc.add(input, {
        accounts: {
          baseAccount: (await getKeyPair()).publicKey,
          user: provider.wallet.publicKey,
        },
      });

      getGifList();
    } catch (error) {
      console.error("Error in adding GIF:\n", error);
    }

    setIsLoading(false);
    setInput("");
  };

  const handleRemoveGif = async (url: string) => {
    setIsLoading(true);

    try {
      const program = await getProgram();
      const provider = getProvider();

      await program.rpc.delete(url, {
        accounts: {
          baseAccount: (await getKeyPair()).publicKey,
          user: provider.wallet.publicKey,
        },
      });

      getGifList();
    } catch (error) {
      console.error("Error in removing GIF:\n", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (address) {
      getGifList();
      console.log("GIFs fetched", gifs);
    }
  }, [address]);

  return (
    <div className="w-full bg-neutral-900 text-neutral-100">
      <div className="w-full h-full flex justify-center py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-black">Is it GIF or JIF?</h1>
            <h2 className="text-xs font-black uppercase">Powered by Solana</h2>
            {address ? (
              <h3 className="text-xs font-black uppercase">
                Connected as {displayAddress(address)}
              </h3>
            ) : null}
          </div>
          <div className="px-4 max-w-lg w-full flex items-center justify-center space-x-6">
            <input
              className="w-full px-4 py-2 rounded-lg text-neutral-900 font-bold"
              type="text"
              placeholder="Enter a new GIF from Giphy"
              onChange={handleInputChange}
              value={input}
            />
            <button
              className="bg-neutral-100 text-neutral-900 px-6 py-2 rounded-lg font-bold disabled:cursor-not-allowed"
              onClick={handleAddGif}
              disabled={isLoading || !input || !address}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {gifs.length > 0
              ? gifs.map((gif) => (
                  <div
                    key={gif.url}
                    className="w-full flex flex-col items-center"
                  >
                    <img
                      className="w-full h-24 object-cover rounded-t-lg cursor-pointer"
                      src={gif.url}
                      alt="GIF"
                      onClick={() => {
                        window.open(gif.url, "_blank");
                      }}
                    />
                    <div className="w-full h-8 flex items-center justify-center bg-neutral-800 rounded-b-lg">
                      <h3 className="text-xs font-black uppercase truncate">
                        {gif.userAddress.toString() === address ? (
                          <span
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleRemoveGif(gif.url)}
                          >
                            Delete
                          </span>
                        ) : (
                          displayAddress(gif.userAddress.toString())
                        )}
                      </h3>
                    </div>
                  </div>
                ))
              : new Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-44 h-32 rounded-lg bg-neutral-800 animate-pulse"
                    />
                  ))}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-xs font-black uppercase">
              <a href="https://herbievine.com" target="_blank" rel="noreferrer">
                Made by @vineherbie :)
              </a>
            </h2>
            {address ? (
              <button
                className="bg-neutral-100 text-neutral-900 px-6 py-2 rounded-lg font-bold"
                onClick={disconnect}
              >
                Disconnect
              </button>
            ) : (
              <button
                className="bg-neutral-100 text-neutral-900 px-6 py-2 rounded-lg font-bold"
                onClick={connect}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
