import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/store';

function useWalletUser(){
    const walletUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const setUser = (savedData)=>{
        dispatch(updateUser(savedData));
    }
    
    return [walletUser,setUser];
}

export default useWalletUser;