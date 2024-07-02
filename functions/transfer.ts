import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram } from "@solana/web3.js";
// import {createMemoInstruction} from "./create-memo-instruction";

async function main() {
  const sender = getKeypairFromEnvironment("SECRET_KEY");
  console.log(`🟢 `, sender.publicKey.toBase58());

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // const receiver = new PublicKey("4QJ1YXCFZfVAq2hnhJRBNduXoiNhmVenipSbwcVHqptu");
  const balance = await connection.getBalance(sender.publicKey);
  console.log(`TEST ${balance / LAMPORTS_PER_SOL} SOL`);

  const transaction = new Transaction();
  const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: sender.publicKey,
      lamports: 0.1 * LAMPORTS_PER_SOL, // 1 SOL
    }
  );
  transaction.add(transferInstruction);

  // const memo = 'Multumesc ...';
  // const memoInstruction = createMemoInstruction(memo);
  // transaction.add(memoInstruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log(`🟢 Transaction confirmed. Signature: ${signature}`);
  } catch (error) {
    console.error(`🔴 Transaction failed: ${error}`);
  }
}


main().catch(err => {
  console.error(err);
});
