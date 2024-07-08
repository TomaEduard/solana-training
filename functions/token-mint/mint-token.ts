import {Connection, PublicKey} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";
import {getOrCreateAssociatedTokenAccount, mintTo, transfer} from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`#1 🟢 `, user.publicKey.toBase58());

const RECIPIENT_ADDRESS = "4QJ1YXCFZfVAq2hnhJRBNduXoiNhmVenipSbwcVHqptu";
const TOKEN_MINT_ADDRESS = "8nGCXZFu1QTRzvWtjvdNAJsw9M15rJXhUmeuUzjjNzTe"; // Owner of the token mint
const recipient = new PublicKey(RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
const MINOR_UNIS_PER_MAJOR_UNIT = Math.pow(10, 9);


const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey
);

console.log(`🟢 #2 Attempting to send 1 token to ${recipient.toBase58()}`,);

const txSig = await transfer(
  connection,
  user,
  senderTokenAccount.address,
  recipient,
  user,
  10 * MINOR_UNIS_PER_MAJOR_UNIT
);

// @ts-ignore
const link = getExplirerLink("transaction", txSig, "devnet");
console.log(`#3 Transaction confirmed, explorer link is: ${link}`, );
