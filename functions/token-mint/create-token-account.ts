import {Connection, PublicKey} from "@solana/web3.js";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import "dotenv/config";
import {getOrCreateAssociatedTokenAccount} from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`#1 🟢 `, user.publicKey.toBase58());

const RECIPIENT_ADDRESS = "4QJ1YXCFZfVAq2hnhJRBNduXoiNhmVenipSbwcVHqptu";
const TOKEN_MINT_ADDRESS = "8nGCXZFu1QTRzvWtjvdNAJsw9M15rJXhUmeuUzjjNzTe"; // Owner of the token mint
const recipient = new PublicKey(RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

// @ts-ignore
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient
);


const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");
console.log(`🟢 #2 Token Account: ${link}`, );
