import {useState, useRef, useContext} from "react"
import Button from "../button/Button"
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context"
import stakingContext from "../../context/StakingContext"
import { toast } from "react-hot-toast";
import "./Withdraw.css"

const WithdrawStakedAmount = () => {
    const {stakingContract} = useContext(Web3Context)
    const [transactionStatus, setTransactionStatus] = useState('')
    const {isReload, setIsReload} = useContext(stakingContext)
    const withdrawStakedAmountRef = useRef()

    const withdrawToken = async(e) => {
        e.preventDefault()
        const amount = withdrawStakedAmountRef.current.value.trim()
        if(isNaN(amount) || amount <= 0) {
            console.error("Please enter a valid positive number")
            return
        }

        const amountToWithdraw = ethers.parseUnits(amount, 18).toString()
        try{
            const transaction = await stakingContract.withdraw(amountToWithdraw)
            await toast.promise(transaction.wait(),
            {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            });
            withdrawStakedAmountRef.current.value = "";
            setIsReload(!isReload);
        } catch(error){
            toast.error("Staking Failed");
            console.log(error.message)
        }
    }

    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit={withdrawToken} className="withdraw-form">
                <label>Withdraw token: </label>
                <input type="text" ref={withdrawStakedAmountRef}></input>
                <Button onClick={withdrawToken}  type="submit" label="Token Witdraw"/>
            </form>
        </div>
    )
}
export default WithdrawStakedAmount