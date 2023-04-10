import { useState } from "react";
import LoginWalletModal from "../components/loginWalletModal";
import { HashConnect } from 'hashconnect';

function MainPage() {
    //SHOW LOGIN FUNC
    const [showLoginWallet,setShowLoginWallet] = useState(true);
    
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

            saveData.topic = initData.topic;
            saveData.pairingString = initData.pairingString;
            console.log(initData);
        
            hashconnect.findLocalWallets();
            hashconnect.pairingEvent.once((pairingData) => {
                console.log('pairing data',pairingData)
            })
            
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
            })
            
            
            console.log('saveData',saveData)
        }
    }

    let loginWalletModal;
    if(showLoginWallet){
        loginWalletModal = <LoginWalletModal onClickConnect={onClickConnect}/>
    }
    return <div>
        {loginWalletModal}
        Main Page
    </div>  
}

export default MainPage;