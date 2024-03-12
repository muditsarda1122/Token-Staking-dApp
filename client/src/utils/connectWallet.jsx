import {ethers, Contract} from "ethers";
import stakingAbi from "../ABI/stakingABI.json";
import stakeTokenAbi from "../ABI/stakeTokenABI.json";

export const connectWallet = async()=>{
    try{
        let [signer, provider, stakingContract, stakeTokenContract, chainId] = [null, null, null, null, null];
        //check if metamask installed
        if(window.ethereum==null){
            throw new Error("Metamask not installed");
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })

        //get chainId
        let chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })
        chainId = parseInt(chainIdHex, 16);

        //get selected account
        let selectedAccount = accounts[0];
        if(!selectedAccount){
            throw new Error("no ethereum accounts available");
        }

        //get blockchain provider
        provider = new ethers.BrowserProvider(window.ethereum);

        //we will write too, so need signer
        signer = await provider.getSigner();

        const stakingContractAddress = "0x7d04d9befa418a06bd075614fd45bc17c63ba755";
        const stakeTokenContractAddress = "0x4eb6d1420ba473f611ae011a124bb506af8c4821";

        //create both instances
        stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

        return {provider, selectedAccount, stakeTokenContract, stakingContract, chainId};


    } catch(error){
        console.error(error);
        throw error;
    }
}