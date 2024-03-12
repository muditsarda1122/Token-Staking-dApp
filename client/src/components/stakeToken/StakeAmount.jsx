import {useState, useRef, useContext} from "react"
import Button from "../button/Button"
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context"
import stakingContext from "../../context/StakingContext"
import { toast } from "react-hot-toast";
import "./stakeToken.css"

const StakeAmount = () => {
    const {stakingContract} = useContext(Web3Context)
    const [transactionStatus, setTransactionStatus] = useState('')
    const {isReload, setIsReload} = useContext(stakingContext)
    const stakeAmountRef = useRef()

    const stakeToken = async(e) => {
        e.preventDefault()
        const amount = stakeAmountRef.current.value.trim()
        if(isNaN(amount) || amount <= 0) {
            console.log("Please enter a valid positive number")
            return
        }

        const amountToStake = ethers.parseUnits(amount, 18).toString()
        try{
            const transaction = await stakingContract.stake(amountToStake)
            await toast.promise(transaction.wait(),
            {
                loading: "Transaction is pending...",
                success: 'Transaction successful 👌',
                error: 'Transaction failed 🤯'
            });
            stakeAmountRef.current.value = ""
            setIsReload(!isReload)
        } catch(error){
            toast.error("Staking failed")
            console.log(error.message)
        }
    }

    return(
        <div>
            {transactionStatus && <div>{transactionStatus}</div>}
            <form onSubmit= {stakeToken} className="stake-amount-form">
                <label className="stake-input-label">Stake Amount: </label>
                <input type="text" ref={stakeAmountRef}></input>
                <Button onClick={stakeToken} type="submit" label="Stake Token"/>
            </form>
        </div>
    )
}
export default StakeAmount