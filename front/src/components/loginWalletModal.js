import { useEffect } from "react"
import { createPortal } from "react-dom"

function LoginWalletModal({onClickConnect}){
    useEffect(()=>{
            document.body.classList.add('overflow-hidden')

            return () => {
                document.body.classList.remove('overflow-hidden')
            }
        },[])
        
        return createPortal(
            <div> 
                <div  className="fixed inset-0 bg-black opacity-80"></div> 
                <div className="fixed inset-10  md:inset-x-1/3 h-56 inset-y-10 p-6 xl:p-10 bg-white flex gap-4 flex-col">
                    <h1 className="text-bold text-3xl font-bold text-gray-700">Connect a wallet</h1>
                    <div className="flex flex-col justify-between h-full bg-white">
                        <div className="h-full w-full overflow-y-auto">
                            <div onClick={onClickConnect} className="flex  bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 hover:border-gray-400 p-2 cursor-pointer">
                                <div className="w-3/4 text-2xl flex m-auto text-bold">HashPack wallet</div>
                                <div className="w-1/4 h-full flex justify-end"><img className="h-14 w-14" src="https://dashboard-assets.dappradar.com/document/15402/hashpack-dapp-defi-hedera-logo-166x166_696a701b42fd20aaa41f2591ef2339c7.png"></img></div>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>,
            document.querySelector('.modal-container')
        )
    
}

export default LoginWalletModal