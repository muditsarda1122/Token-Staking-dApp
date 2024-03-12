import {useState, useEffect, useContext} from "react"
import Web3Context from "../../context/Web3Context"
import {ethers} from "ethers"
import "./DisplayPanel.css"

const RewardRate = () => {
    const {stakingContract, selectedAccount} = useContext(Web3Context)
    const [RewardRate, setRewardRate] = useState("0")

    useEffect(() => {
        const fetchRewardRate = async() => {
            try{
                const rateOfReward = await stakingContract.REWARD_RATE();
                const formattedRateOfReward = ethers.formatUnits(rateOfReward.toString(), 18)
                setRewardRate(formattedRateOfReward)
                console.log(formattedRateOfReward)
            } catch(error){
                console.log("Error fetching reward rate: ", error)
            }
        }

        stakingContract && fetchRewardRate()
    }, [stakingContract])

    return(
        <div className="reward-rate">
            <p>Reward Rate:</p>
            <span>{RewardRate} token/sec </span>
        </div>
    )
}

export default RewardRate