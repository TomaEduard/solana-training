import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {airdropIfRequired} from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// console.log(`🟢 Connected to devnet`, );

const myKey = new PublicKey("4QJ1YXCFZfVAq2hnhJRBNduXoiNhmVenipSbwcVHqptu");
const publicKey = new PublicKey(myKey);

async function getBalance() {
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(`🟡 Check Balance: ${balanceInSol} SOL`);
}

getBalance();


async function airdrop() {
  await airdropIfRequired(
    connection,
    publicKey,
    LAMPORTS_PER_SOL * 10, // This is the amount you want to airdrop
    0.1 * LAMPORTS_PER_SOL // This is the minimum balance required before airdrop
  );
}

airdrop();


setTimeout(() => {
  console.log(`🟢 getBalance`,);
  getBalance();
}, 1000);


