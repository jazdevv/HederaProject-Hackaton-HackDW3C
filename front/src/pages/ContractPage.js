import { useParams } from "react-router"
import { useState,useEffect } from "react";
import { contractFactory } from "./WalletConnect";
import useWalletUser from "../hooks/useWalletUser";
import {ContractId } from '@hashgraph/sdk'
import Web3 from "web3";
import axios from "axios";
const abiFileLotteryRaffle = require('../smartContractData/LotteryRafflesAbi.json')

function ContractPage(){
    let { contractAddress } = useParams();
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState({
        lotteryName:"",
        lotteryDescription:"",
        participationsAmount:0,
        miniumAmountParticipate:0
    });
    const [wallet] = useWalletUser();
    useEffect(()=>{
        const getContractData = async()=>{
            // if(wallet.pairedAccounts.length === 0){
            //     return
            // }
            console.log('getting data of ',contractAddress)
            const id = ContractId.fromSolidityAddress(contractAddress)
            console.log('id',id.num.low)
            // console.log(data)
            const getContractsMirrorNode = async () => {
                const web3 = new Web3();
                const abi = abiFileLotteryRaffle.abi;
    
                function decodeEvent(eventName, log, topics) {
                    const eventAbi = abi.find(event => (event.name === eventName && event.type === "event"));
                    const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log, topics);
                    return decodedLog;
                }
                const url = `https://testnet.mirrornode.hedera.com/api/v1/contracts/0.0.${id.num.low}/results/logs?order=asc`;
    
                await axios.get(url).then(function (response) {
                    console.log(response)
                    const jsonResponse = response.data;
                    const last_log = jsonResponse.logs[jsonResponse.logs.length-1];
                    const decoded_data = decodeEvent("eventcontractData", last_log.data, last_log.topics.slice(1));
                    setData(decoded_data);
                    // jsonResponse.logs.forEach((log) => {
                    //     // decode the event data
                    //     const event = decodeEvent("eventcontractData", log.data, log.topics.slice(1));
                    //     console.log(event)
                        
                    // });
                    setLoading(false);
                })
                .catch(function (err) {
                    console.error(err);
                });
                
                
    
            }

            getContractsMirrorNode();
        }

        getContractData()
    },[contractAddress,wallet])
    console.log("data",data)
    let Type = "";
    // //typeof(data.typeContract) = string
    // if(data.typeContract==0){
    //     Type = "Lottery"  
    // }else if(data.typeContract==1){
    //     Type = "Raffle"
    // }else{
    //     Type = "Lottery"  
    // }
    let statusbtn;
    if(data.status==="ongoing"){
        statusbtn = <div className="bg-green-500 p-2 rounded text-black">
            ON GOING
        </div>
    }else{
        statusbtn = <div className="bg-gray-800 p-2 rounded text-black">
            FINISHED
        </div>
    }
    const content = <div className="flex flex-col w-full gap-2">
        <div className="flex w-full gap-6">
            <div className="bg-gray-900 p-6 w-full">
                <div className="text-blue-600 text-xl ">
                    name
                </div>
                <div className="flex w-full text-white text-xl md:text-3xl font-bold">
                    {data.lotteryName}    
                </div>   
                
            </div>    
            <div className="bg-gray-900 p-6 w-full">
                <div className="text-blue-600 text-xl">
                    total participations
                </div>
                <div className="flex w-full text-white text-xl md:text-3xl font-bold">
                    {data.participationsAmount}    
                </div>   
                
            </div> 
            <div className="bg-gray-900 p-6 w-full flex justify-between">
                <div>
                    <div className="text-blue-600 text-xl">
                        entrance price
                    </div>
                    <div className="flex w-full text-white text-md md:text-xl gap-2">
                        <div className="flex gap-2 items-center">
                            {data.miniumAmountParticipate} hbar   
                        </div>
                        
                        <div className="bg-blue-600 p-2 rounded text-white cursor-pointer">
                            Participate
                        </div>
                    </div>     
                </div>
                    <div>
                    <div className="text-blue-600 text-xl">
                        status
                    </div>
                    <div className="flex w-full text-white text-md md:text-xl ">
                        {statusbtn}
                    </div> 
                </div>
                  
                
            </div> 
        </div>
        <div className="bg-gray-900 p-6 w-full">
                <div className="text-blue-600 text-xl ">
                    info
                </div>
                <div className="flex w-full text-gray-500 text-md  ">
                Upon participating in an event and completing the entrance fee, an NFT will be issued as proof of admission. This NFT serves as a ticket for participation and also allows access to the prize pool. If you are fortunate enough to win the lottery, the prize money will be automatically deposited into your account. However, if you win a raffle, you will be required to provide specific credentials in order the raffle creator contact with you and give your prize.                
                </div>   
                
        </div>
        <div className="bg-gray-900 p-6 w-full">
                <div className="text-blue-600 text-xl">
                    description
                </div>
                <div className="flex w-full text-white text-xl">
                    {data.lotteryDescription}
                </div>   
                
        </div>     
        <div className="bg-gray-900 p-6 w-full">
                <div className="text-blue-600 text-xl">
                    prizes
                </div>
                <div className="flex w-full text-white text-xl">
                </div>   
                
        </div> 
        
    </div>
    return <div className="flex flex-col p-10 gap-2">
        <div className="bg-gray-900 p-6">
            <div className="text-blue-600 text-xl">
                Lottery or Raffle unique address
            </div>
            <div className="flex w-full text-white text-xl md:text-3xl ">
                {contractAddress}    
            </div>   
        </div>
        
        {loading?<div role="status" className="w-full flex  h-vh my-auto justify-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>:content}
        
</div>
}

export default ContractPage