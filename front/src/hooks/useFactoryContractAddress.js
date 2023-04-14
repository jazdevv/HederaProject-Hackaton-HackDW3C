import { useSelector } from 'react-redux';

function useFactoryContractAddress(){
    const walletUser = useSelector((state) => state.factoryContractAddress);
    return walletUser.address;
}

export default useFactoryContractAddress;
