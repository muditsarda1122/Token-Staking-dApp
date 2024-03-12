import {useState, useEffect, useContext} from "react"
import Web3Context from "../../context/Web3Context"
import {ethers} from "ethers"
import "./DisplayPanel.css"

const EarnedReward = () => {
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [earnedReward, setEarnedReward] = useState("0")

    useEffect(() => {
        const fetchEarnedReward = async() => {
            try{
                const earnedRewardWei = await stakingContract.earned(selectedAccount)
                const earnedRewardEth = ethers.formatUnits(earnedRewardWei.toString(), 18)
                const roundedReward = parseFloat(earnedRewardEth).toFixed(2)
                setEarnedReward(roundedReward)
                console.log(roundedReward)
            } catch(error){
                console.log("Error fetching earned reward: ", error)
            }
        }
        const interval = setInterval(() => {
            stakingContract && fetchEarnedReward();
        }, 20000)
        return ()=> clearInterval(interval)
        
    }, [stakingContract, selectedAccount])

    return(
        <div className="earned-reward">
            <p>Earned Reward:</p>
            <span>{earnedReward}</span>
        </div>
    )
}

export default EarnedReward