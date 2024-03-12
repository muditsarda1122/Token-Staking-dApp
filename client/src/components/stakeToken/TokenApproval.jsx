import {useState, useRef, useContext} from "react"
import Button from "../button/Button"
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context"
import { toast } from "react-hot-toast";
import "./stakeToken.css"

const TokenApproval = () => {
    const {stakeTokenContract, stakingContract} = useContext(Web3Context)
    const [transactionStatus, setTransactionStatus] = useState('')
    const approvedTokenRef = useRef()

    const approveToken = async(e) => {
        e.preventDefault()
        const amount = approvedTokenRef.current.value.trim()
        if(isNaN(amount) || amount <= 0) {
            console.error("Please enter a valid positive number")
            return
        }

        const amountToSend = ethers.parseUnits(amount, 18).toString()
        try{
            const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend)
            await toast.promise(transaction.wait(),
            {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            });
            approvedTokenRef.current.value = ""
        } catch(error){
            toast.error("Token Approval Failed");
            console.log(error.message)
        }
    }

    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={approveToken} className="token-amount-form">
                <label className="token-input-label">Token Approval: </label>
                <input type="text" ref={approvedTokenRef}></input>
                <Button onClick={approveToken}  type="submit" label="Token Approve"/>
            </form>
        </div>
    )
}
export default TokenApproval