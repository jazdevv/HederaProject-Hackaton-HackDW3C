import { useSelector } from 'react-redux';

function usefactoryContractAddress(){
    const walletUser = useSelector((state) => state.factoryContractAddress);

    return walletUser;
}

export default usefactoryContractAddress;
