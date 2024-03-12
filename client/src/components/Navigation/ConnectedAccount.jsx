import { useContext } from "react"
import Web3Context from "../../context/Web3Context"

const ConnectedAccount = () => {
    const {selectedAccount} = useContext(Web3Context);

    if(!selectedAccount){
        return(
            <p>No account connected yet</p>
        )
    } else{
        return (
            <p>Connected Account: {selectedAccount}</p>
        )
    }
}

export default ConnectedAccount