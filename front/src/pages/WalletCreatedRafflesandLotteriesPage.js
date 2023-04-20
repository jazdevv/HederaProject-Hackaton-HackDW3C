import { useEffect,useState } from "react";
import { contractFactory } from "./WalletConnect";
import useWalletUser from "../hooks/useWalletUser";
import { Link } from "react-router-dom";

function createdRafflesandLotteries(){
    const [userCreatedContracts,setUserCreatedContracts] = useState([]);
    const [wallet] = useWalletUser();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        if(wallet.pairedAccounts.length === 0){
            return
        }
        const getContracts = async()=>{
           const data = await contractFactory.getUserContracts();
           console.log('returned data',data)
           setUserCreatedContracts(data);
           setLoading(false);
        }

        getContracts();
        

        
    },[wallet])
    const renderedContracts = userCreatedContracts.map(contractAddr=>{
        const length = contractAddr.length
        return <Link key={contractAddr} to={`/contract/${contractAddr}`}>
            <div key={contractAddr} className="w-full flex gap-6 text-white cursor-pointer border-b-2 border-blue-600 pb-2 text-xl items-center">
                
                <div className="sm:hidden grow">
                    {contractAddr.substring(0,3)}...{contractAddr.substring(length-3,length)}
                </div>
                <div className="hidden sm:block lg:hidden grow">
                    {contractAddr.substring(0,3)}...{contractAddr.substring(length-10,length)}
                </div>
                <div className="hidden lg:block ">
                    {contractAddr}
                </div>
                <div className="flex bg-blue-600 gap-2 text-white flex-row w-44 justify-between p-2 rounded hidden md:flex" >
                    <div>
                        More Details
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                    </svg>
                </div>
                
                
            </div>
        </Link>
    })
    return <div className="flex flex-col gap-2 p-10">
        <div className="flex w-full text-white text-xl md:text-3xl bg-gray-900 p-6">
                Created lotteries & raffle by {wallet.pairedAccounts[0]}
            </div>
            <div className="flex gap-6">
                <div className="text-blue-600 flex pb-2 text-xl w-96 ">
                    Lottery or Raffle Contract Id
                </div>    
                
                 
                
            </div>
            {loading
            ?
            <div role="status" className="w-full flex  h-vh my-auto justify-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
            </div>
            :renderedContracts
            }
        {}
    </div>;
     
}

export default createdRafflesandLotteries;