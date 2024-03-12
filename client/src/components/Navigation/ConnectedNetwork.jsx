import { useContext } from "react"
import Web3Context from "../../context/Web3Context"

const ConnectedNetwork = () => {
    const {chainId} = useContext(Web3Context);

    if(!chainId){
        return(
            <p>No chain connected</p>
        )
    }

    if(chainId === 11155111){
        return(
            <p>Connected chain: Sepolia</p>
        )
    } else {
        return(
            <p>Connected chain is not supported</p>
        )
    }
}

export default ConnectedNetwork