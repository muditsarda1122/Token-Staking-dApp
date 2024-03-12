// we manage web3 state using this

import { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../button/Button"; 
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import "./Wallet.css"

const Wallet =({children})=>{
    const[state, setState] = useState({
        provider:null,
        selectedAccount:null,
        stakingContract:null,
        stakeTokenContract:null,
        chainId:null
    })

    const[isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        window.ethereum.on('accountsChanged', ()=>{handleAccountChange(setState)})
        window.ethereum.on('chainChanged', ()=>{handleChainChange(setState)})

        return() => {
            window.ethereum.removeListener('accountsChanged', ()=>{handleAccountChange(setState)})
            window.ethereum.removeListener('chainChanged', ()=>{handleChainChange(setState)})
        }
    }, [])

    const handleWallet = async() => {
        try{
            setIsLoading(true);
            const {
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId} = await connectWallet();
            // console.log("Provider: ", provider, "Selected Account: ", account, "Staking Contract: ", stakingContract, "Stake Token: ", stakeTokenContract, "Chain ID: ", chainId);
            // this info about the wallet will be used throughout the dapp, so we will create a context for all of it. 
            setState({
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainId});
        }catch(error){
            console.error("error connecting wallet: ", error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="Connect-Wallet">
            <Web3Context.Provider value={state}>
                {children}
            </Web3Context.Provider>
            {isLoading && <p>Loading...</p>}
            <Button onClick={handleWallet} label="Connect Wallet" />
        </div>
    )
}
export default Wallet;