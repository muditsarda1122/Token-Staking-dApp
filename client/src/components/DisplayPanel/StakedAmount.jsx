import {useState, useEffect, useContext} from "react"
import Web3Context from "../../context/Web3Context"
import {ethers} from "ethers"
import StakingContext from "../../context/StakingContext"
import "./DisplayPanel.css"

const StakedAmount = () => {
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [stakedAmount, setStakedAmount] = useState("0")
    const {isReload} = useContext(StakingContext)

    useEffect(() => {
        const fetchStakedAmount = async() => {
            try{
                const amountStakedWei = await stakingContract.stakedBalance(selectedAccount)
                const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(), 18)
                setStakedAmount(amountStakedEth)
                console.log(amountStakedEth)
            } catch(error){
                console.log("Error fetching data: ", error)
            }
        }
        stakingContract && fetchStakedAmount()
    }, [stakingContract, selectedAccount, isReload]) 

    return(
        <div className="staked-amount">
            <p>Staked Amount: </p> <span>{stakedAmount}</span>
        </div>
    )
}

export default StakedAmount