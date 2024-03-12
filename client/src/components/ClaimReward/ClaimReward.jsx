import {useState, useRef, useContext} from "react"
import Button from "../button/Button"
import Web3Context from "../../context/Web3Context"
import { toast } from "react-hot-toast";
import "./ClaimReward.css"

const ClaimReward = () => {
    const {stakingContract} = useContext(Web3Context)
    const [transactionStatus, setTransactionStatus] = useState('')

    const ClaimReward = async(e) => {
        try{
            const transaction = await stakingContract.getReward()
            await toast.promise(transaction.wait(),
            {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            });
        } catch(error){
            toast.error("Reward claim failed")
            console.log(error.message)
        }
    }

    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <Button onClick={ClaimReward}  type="submit" label="Claim Reward"/>
        </div>
    )
}
export default ClaimReward