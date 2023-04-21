import { useParams } from "react-router"
import { useState,useEffect } from "react";
import { contractFactory } from "./WalletConnect";
import EmailWinner from "../components/emailWinner";
import useWalletUser from "../hooks/useWalletUser";
import { ContractId } from "@hashgraph/sdk";
import Web3 from "web3";
import axios from "axios";
const abiFileLotteryRaffle = require('../smartContractData/LotteryRafflesAbi.json')
function ContractWinnersInfo(){
    let { contractAddress } = useParams();
    const [winners,setWinners] = useState([]);
    const [prizes,setPrizes] = useState([]);
    const [loading,setLoading] = useState(true);
    const [wallet] = useWalletUser();

    useEffect(()=>{
        const getContractData = async()=>{
            if(wallet.pairedAccounts.length === 0){
                return
            }
            const id = ContractId.fromSolidityAddress(contractAddress)
            const getContractsMirrorNode = async () => {
                const web3 = new Web3();
                const abi = abiFileLotteryRaffle.abi;
    
                function decodeEvent(eventName, log, topics) {
                    const eventAbi = abi.find(event => (event.name === eventName && event.type === "event"));
                    const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log, topics);
                    return decodedLog;
                }

                const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/0.0.${id.num.low}/results/logs?order=desc`;
    
                await axios.get(url).then(function (response) {
                    const jsonResponse = response.data;
                    const decoded_data = decodeEvent("eventcontractData", jsonResponse.logs[0].data, jsonResponse.logs[0].topics.slice(1));
                    setLoading(false);
                    setPrizes([...decoded_data.prizesRaffle])
                    setWinners([...decoded_data.winnersArray])
                })
                .catch(function (err) {
                    console.error(err);
                });

                

                //OTHER WAY THAT ALSO WORKS
                // const { ethers } = require("ethers");

                // const provider = new ethers.providers.JsonRpcProvider(/* Your provider URL here */);

                // const contractABI = [...]; // The ABI of your LotteryContract
                // const contractAddress = "0x..."; // The address of your deployed LotteryContract

                // const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

                // contractInstance.on("eventcontractData", (val, creator, lotteryName, lotteryDescription, miniumAmountParticipate, amount, participationsAmount, status, prizesLottery, prizesRaffle, event) => {
                //     console.log("Event data:");
                //     console.log("val:", val);
                //     console.log("creator:", creator);
                //     console.log("lotteryName:", lotteryName);
                //     console.log("lotteryDescription:", lotteryDescription);
                //     console.log("miniumAmountParticipate:", miniumAmountParticipate.toString());
                //     console.log("amount:", amount.toString());
                //     console.log("participationsAmount:", participationsAmount.toString());
                //     console.log("status:", status);
                //     console.log("prizesLottery:", prizesLottery);
                //     console.log("prizesRaffle:", prizesRaffle);
                // });
                
                
    
            }

            getContractsMirrorNode();
        }

        getContractData()
    },[contractAddress,wallet])
    console.log('---',winners,prizes)
    const renderedWallets = winners.map((winner,i)=>{
        return <EmailWinner wallet={winner} prize={prizes[i]} contractid={contractAddress}/>
    })
    return <div className="p-6 grid grid-cols-3 w-full auto-cols-auto bg-gray-900 gap-6">
        <div className="text-blue-600 text-xl">
            wallet address
        </div>
        <div className="text-blue-600 text-xl">
            prize
        </div>
        <div className="text-blue-600 text-xl">
            email
        </div>
        {renderedWallets}
    </div>
}

export default ContractWinnersInfo;