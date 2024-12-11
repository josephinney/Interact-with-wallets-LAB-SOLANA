import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js"

export const PingButton: FC = () => {

	//Hooks de react para interactuar con la blockchain de Solana.
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	
	const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
	const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

    const onClick = async () => {

		console.log("Conexión activa: ", connection.rpcEndpoint);

		if(!connection || !publicKey) {
			console.error("Wallet not connected or connection not available")
			return;
		}

		try {

			const programId = new PublicKey(PROGRAM_ID);
			const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY);
			const transaction = new Transaction();

			const instruction = new TransactionInstruction({
				programId: programId,
				keys: [
					{
						pubkey: programDataAccount,
						isSigner: false,
						isWritable: true,
					},
				],
			})

			transaction.add(instruction);
			
			const signature = await sendTransaction(transaction, connection);
			console.log("Transaction Signature: ", signature)

			
		} catch (error) {
			console.log("Transaction failed: ", error);
			if (error.logs) {
				console.log("Error Logs:", error.logs);
			}
		}
        
    }
    
	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Ping!</button>
		</div>
	)
}

