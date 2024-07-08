import {Connection} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import {createMint} from "@solana/spl-token";
import "dotenv/config";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`#1 🟢 `, user.publicKey.toBase58());

const tokenMint = await createMint(
  connection,
  user,
  user.publicKey,
  null,
  9,
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`#2 🟢 Token Mint: ${link}`, );
