import {Connection, PublicKey} from "@solana/web3.js";
import "dotenv/config";
import {getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";
import {getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`#1 🟢 `, user.publicKey.toBase58());

const RECIPIENT_ADDRESS = "4QJ1YXCFZfVAq2hnhJRBNduXoiNhmVenipSbwcVHqptu";
const TOKEN_MINT_ADDRESS = "8nGCXZFu1QTRzvWtjvdNAJsw9M15rJXhUmeuUzjjNzTe"; // Owner of the token mint
const recipient = new PublicKey(RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);
const MINOR_UNIS_PER_MAJOR_UNIT = Math.pow(10, 9);

// @ts-ignore
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  user.publicKey
);

console.log(`🟢 Create token Account: ${tokenAccount.address.toBase58()}`, );

// @ts-ignore
const mintTxSig = await mintTo(
  connection,
  user,
  tokenMintAccount,
  tokenAccount.address,
  user,
  100 * MINOR_UNIS_PER_MAJOR_UNIT
);

const link = getExplorerLink("transaction", mintTxSig, "devnet");
console.log(`🟢 #2 Success: ${link}`, );
