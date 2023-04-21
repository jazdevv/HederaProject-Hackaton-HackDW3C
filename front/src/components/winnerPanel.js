import { useEffect, useState } from "react";
import useWalletUser from "../hooks/useWalletUser"
import axios from "axios";
import { contractFactory } from "../pages/WalletConnect";

function WinnerPanel({prizesArray,winnersArray,type,amount,contractid}){
    const [wallet] = useWalletUser();
    const [userPrizes,setUserPrizes] = useState([]);
    const [userevm,setUserEvm] = useState('');
    const [email,setEmail] = useState('');
    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    
    const onClickConfirmReception = () => {
        contractFactory.getWinnerUser(contractid)

        contractFactory.confirmPrizeReception(contractid)
    }

    const onClickSave = () => {
        contractFactory.winnerAddContactInfo(contractid,email);
    }
    useEffect(()=>{
        const setEvmAddress = async () => {
            const url = `https://testnet.mirrornode.hedera.com/api/v1/accounts/${wallet.pairedAccounts[0]}`
            const res = await axios.get(url);
            String.prototype.replaceAt = function(index, replacement) {
                return this.substring(0, index) + replacement + this.substring(index + replacement.length);
            }
            setUserEvm(res.data.evm_address.toUpperCase().replaceAt(1,'x'))    
        }
        setEvmAddress();
    },[])
    useEffect(()=>{
        if(userevm.length===0){
            return
        }
        const prizes = [];
        winnersArray.map((winnerAddr,i)=>{
            if(winnerAddr==userevm){
                prizes.push({index:i,prize:prizesArray[i]})
            }
        })
        setUserPrizes([...prizes]);
    },[userevm])
    let renderPrizes;
    let winnerDataform;
    if(type=='lottery'){
        renderPrizes = userPrizes.map((prize)=>{
                return <div className="text-white">{prize.index}-{prize.prize}</div>
            })   
        winnerDataform   = <></>  
    }else{
        console.log(winnersArray)
        renderPrizes = userPrizes.map((prize)=>{
            console.log(prize.index)
            return <div className="flex gap-2 items-center">
                <div className="text-white">
                    {prize.index}-{prize.prize}
                </div>
                <div onClick={onClickConfirmReception} className="p-2 bg-yellow-400 rounded cursor-pointer">
                    confirm prize reception
                </div>
                <div className="text-gray-600">
                    please confirm only one time
                </div>  
            </div>
        });
        winnerDataform = <div className="flex gap-4 items-end">
            <div className="flex flex-col">
                <div className="text-yellow-400">
                    email
                </div>
                <div>
                    <input onChange={onChangeEmail} value={email} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" placeholder="your email" />
                </div>
            </div>
            <div onClick={onClickSave} className="bg-yellow-400 p-2 h-1/2 rounded">
                SAVE
            </div>
            <div className="text-gray-600">
                    please send only one time
            </div>  
            
        </div>
    }
    
    if(userPrizes.length===0){
        return <></>
    }else{
        return <div className="flex flex-col gap-2 w-full ">
            <div className=" text-xl p-6 bg-yellow-400 text-gray-900 font-bold w-96 text-center w-full">
                CONGRATULATIONS YOU A WINNER!!!
            </div>
            <div className="flex flex-col bg-gray-900 p-6 text-xl">
                <div className="text-yellow-400">
                    RECEIVED PRIZES
                </div>
                <div className="flex flex-col gap-4">
                    {renderPrizes}    
                </div>
                <div className="flex flex-col">
                    {winnerDataform}
                </div>
                
            </div>
        </div>    
    }
    
}

export default WinnerPanel