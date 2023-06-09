import { useState } from "react";
import LoginWalletModal from "../components/loginWalletModal";
import { HashConnect } from 'hashconnect';
import { Outlet } from "react-router";
import Header from "../components/header";
import ContractFactory from "../components/useContractFactory";
import useWalletUser from "../hooks/useWalletUser";
import usefactoryContractAddress from "../hooks/useFactoryContractAddress";

let contractFactory;
function WalletConnect() {
    const [walletuser,setWalletUser] = useWalletUser();
    //SHOW LOGIN FUNC
    const [showLoginWallet,setShowLoginWallet] = useState(true);
    const factoryaddress = usefactoryContractAddress();

    const hashconnect = new HashConnect();

    
    let saveData = {
        topic:"",
        pairingString:"",
        pairedAccounts:[]
    }

    const appMetaData = {
        name: 'HashLottery',
        description: 'Connect Wallet to HashLottery',
        // icon:"https://iso.500px.com/wp-content/uploads/2015/03/business_cover.jpeg"
        //icon:"https://pbs.twimg.com/profile_images/1172976367643684864/Hi0aIB10_400x400.jpg"
        icon:"https://cryptodailycdn.ams3.cdn.digitaloceanspaces.com/hedera.png"
    }

    const onClickConnect = async () => {
        if(saveData.pairedAccounts.length===0){
            let initData = await hashconnect.init(appMetaData,'testnet',true);
            
            console.log(initData)
            setWalletUser({
                topic: initData.topic,
                pairingString: initData.pairingString
            });
            
        
            hashconnect.findLocalWallets();            
            hashconnect.connectToLocalWallet(saveData.pairingString);

            hashconnect.pairingEvent.once(pairingData=>{
    
                pairingData.accountIds.forEach(id=>{
                    if(saveData.pairedAccounts.indexOf(id)===-1){
                        saveData.pairedAccounts.push(id);
                    }
                    
                    if(saveData.pairedAccounts.length>0){
                        setShowLoginWallet(false);
                    }
                })
                setWalletUser({pairedAccounts:saveData.pairedAccounts});
                contractFactory = new ContractFactory(hashconnect,{topic: initData.topic,pairedAccounts:[...saveData.pairedAccounts]},factoryaddress);
            })
            
            
            // console.log('saveData',saveData)
        }
    }

    let loginWalletModal;
    if(showLoginWallet){
        loginWalletModal = <LoginWalletModal onClickConnect={onClickConnect}/>
    }
    return <>
        {loginWalletModal}
        <Header/>
        <div className="gris w-full h-full">
            <Outlet/>   
        </div>
    </>  
}

export default WalletConnect;
export {contractFactory};