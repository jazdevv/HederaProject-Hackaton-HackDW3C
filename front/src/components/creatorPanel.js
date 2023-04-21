import { contractFactory } from "../pages/WalletConnect";
import { useState } from 'react'
import { Link } from "react-router-dom";
function CreatorPanel({data,type,contractid}){

    const [initialAmountValue,setaddInitialAmountValue] = useState(0);
    const setInitialAmountValue = (event) => {
        if(initialAmountValue > 100000000 && event.target.value > initialAmountValue){
            return
        }
        setaddInitialAmountValue(event.target.value);
    }
    const onClickAddInitialAmount = () => {
        contractFactory.addInitialAmount(contractid,initialAmountValue);
    }

    const onClickChooseWinner = () => {
        contractFactory.contractChooseWinner(contractid);
    }

    const onClickWithdrawFees = () => {
        contractFactory.withdrawCreatorFees(contractid);
    }
    let addinitialamount;
    let withdrawfeesdata;
    let winnersdata;
    let pickwinners;
    let withdrawfees = <div className="flex flex-col">
                            <div className="flex flex-col text-blue-600 text-xl flex gap-2">
                                <div>withdraw fees to my wallet(at least half participations confirmed required)</div> <div className="text-md text-gray-500">{withdrawfeesdata}</div>
                            </div>
                            <div onClick={onClickWithdrawFees} className="w-56 text-center bg-blue-600 p-2 rounded text-white cursor-pointer">
                                Withdraw fees to my wallet
                            </div>
                        </div>;
    if(type=='lottery'){
        addinitialamount = <div className="flex flex-col gap-2">
            <div className="text-blue-600 text-xl ">
                add initial amount
            </div>
            <div className="flex gap-2 flex-col">
                <div className="text-white">
                    <input type="number" onChange={setInitialAmountValue} value={initialAmountValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"/> hbar
                </div>
                <div onClick={onClickAddInitialAmount} className=" bg-blue-600 p-2 rounded text-white cursor-pointer  text-center">
                    Add initial amount
                </div>   
            </div>
        
        </div>
        pickwinners = <div className="flex flex-col gap-2 justify--between">
            <div className="text-blue-600 text-xl ">
                algorithm pick winners
            </div>
            <div onClick={onClickChooseWinner} className="bg-blue-600 p-2 rounded text-white cursor-pointer text-cl">
                Pick Winners and finish {type}
            </div>
            <div className="bg-gray-500 text-white text-sm w-56 p-2">
            Please note that there should be a minimum of twice as many participants as there are total prizes available. This means that the number of entries must be at least double the number of prizes.            </div>
        </div> 
        withdrawfeesdata = "% of fees you set when creation"  
        if(data.status=="finished"){
            addinitialamount = <></>
            pickwinners = <></>
            withdrawfees = <div className="flex flex-col">
                                <div className="flex flex-col text-blue-600 text-xl flex gap-2">
                                    <div>{withdrawfeesdata}</div>
                                </div>
                                <div className="w-56 text-center bg-gray-600 p-2 rounded text-black cursor-pointer">
                                    Withdraw fees to my wallet
                                </div>
                            </div>;
            withdrawfeesdata = "your fees amount got sended automatically to your wallet"
        }
        
        
        winnersdata = <></>
    }else{
        addinitialamount = <></>
        withdrawfeesdata = "available when more of 50% winners receive this prize"
        winnersdata =   <div className="flex flex-col">
                            <div className="text-blue-600 text-xl flex gap-2">
                                <div>winners</div>
                            </div>
                            <Link to={`/contractwinners/${contractid}`}>
                                <div className="w-56 text-center bg-blue-600 p-2 rounded text-white cursor-pointer">
                                    Watch winners data
                                </div>
                            </Link>
                            
                        </div>
                        pickwinners = <div className="flex flex-col gap-2 justify--between">
                        <div className="text-blue-600 text-xl ">
                            algorithm pick winners
                        </div>
                        <div onClick={onClickChooseWinner} className="bg-blue-600 p-2 rounded text-white cursor-pointer text-cl">
                            Pick Winners and finish {type}
                        </div>
                        <div className="p-2 bg-gray-500 text-white text-sm w-56">
                        Please note that there should be a minimum of twice as many participants as there are total prizes available. This means that the number of entries must be at least double the number of prizes.                        </div>
                    </div>  
        if(data.status=="finished"){
            addinitialamount = <></>
            pickwinners = <></>
        } 
    }


   return (
   <div className="flex flex-col gap-2 w-full p-6 bg-gray-800">
        <div className="bg-blue-600 text-xl p-2 text-white w-96 text-center">
            creator administration panel
        </div>
        <div className="flex flex-col md:flex-row justify-between">
            
            {pickwinners} 
            {addinitialamount}
            {winnersdata}
            {withdrawfees}
            
        </div>   
   </div> 
   )
}

export default CreatorPanel;