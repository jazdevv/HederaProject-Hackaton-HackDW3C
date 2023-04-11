import { Link } from "react-router-dom";
import useWalletUser from "../components/useWalletUser";
import { IoIosArrowDropdownCircle,IoIosArrowDropleftCircle  } from "react-icons/io";
import { useState } from "react";

function Header(){
    const [walletUser] = useWalletUser();
    const [openDropdown,setOpenDropDown] = useState(false);
    const degradiant1 = "h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
    const degradiant = "banner";

    const onClick = ()=>{
        setOpenDropDown(!openDropdown);
    }

    console.log(walletUser)
    return <div className="flex flex-col w-full">
        <div className={`header h-12 w-full ${degradiant}`}>
            <div className="blue text-white text-md font-bold">
                Create Lotteries and Raffles or Participate and win amazing prizes!
            </div>
        </div>
        <div className=" md:h-16 bg-gray-200 justify-between w-full flex flex-col md:flex-row py-4 md:py-0 gap-4 md:gap-0 border-b-2 pb-2 border-gray-300">
            
            <div className="flex content-center px-4 md:pl-10 gap-2 md:gap-6 grow py-2">
                <div className="p-2 self-center text-blue-600 text-white text-xl font-bold">
                CryptoLotto
                </div>
                <div className="flex content-center w-3/4">
                    <div className="self-center text-gray-700 font-md font-bold rounded w-full">
                        <div className="flex flex-col w-full">
                           <form>   
                                <label  className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-300 focus:outline-none" placeholder="Search Lottery or Ruffle By Its Address ex.0x29283h23h23g23ihg23" />
                                    <button type="submit" className="text-gray-700 absolute right-2.5 bottom-2.5 bg-gray-400   font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                                </div>
                            </form> 
                        </div>
                        
                    </div>   
                </div>  
                
                
            </div>
            <div className="flex justify-end content-center pr-4 md:pr-10 gap-2 md:gap-4 shrink-0">
                <Link to="/newLottery" className="flex content-center">
                    <div className="p-2 self-center bg-blue-600 text-white text-md font-bold hover:bg-blue-800">
                        Create lottery
                    </div>
                </Link>
                <Link to="/newRuffle" className="flex content-center">
                    <div className="p-2 self-center bg-blue-600 text-white text-md font-bold hover:bg-blue-800">
                        Create ruffle
                    </div>
                </Link>
                <div onClick={onClick} className="flex content-center relative cursor-pointer">
                    <div className="p-2 self-center bg-gray-500 text-gray-900 font-md font-bold rounded flex content-center gap-1 w-full justify-end hover:bg-gray-400">
                        wallet {walletUser.pairedAccounts[0]}
                        {openDropdown ? <svg className="my-auto" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm289.1-43.4c7.5-7.5 19.8-7.5 27.3 0 3.8 3.8 5.6 8.7 5.6 13.6s-1.9 9.9-5.7 13.7l-94.3 94c-7.6 6.9-19.3 6.7-26.6-.6l-95.7-95.4c-7.5-7.5-7.6-19.7 0-27.3 7.5-7.5 19.7-7.6 27.3 0l81.1 81.9 81-79.9z"></path></svg>:<svg className="my-auto" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm43.4 289.1c7.5 7.5 7.5 19.8 0 27.3-3.8 3.8-8.7 5.6-13.6 5.6s-9.9-1.9-13.7-5.7l-94-94.3c-6.9-7.6-6.7-19.3.6-26.6l95.4-95.7c7.5-7.5 19.7-7.6 27.3 0 7.5 7.5 7.6 19.7 0 27.3l-81.9 81 79.9 81.1z"></path></svg>}
                    </div>                        
   
                    {openDropdown && <div className="absolute top-12 w-full bg-blue flex flex-col gap-2 bg-gray-500 text-gray-900 font-lg font-bold rounded ">
                        <Link to='/wallet/created/raffles'>
                            <div className="w-full flex justify-end hover:bg-gray-400 p-2">
                                created raffles
                            </div>
                        </Link>
                        <Link to='/wallet/created/lotteries'>
                            <div className="w-full flex justify-end hover:bg-gray-400 p-2">
                                created lotteries
                            </div>
                        </Link>
                        <Link to='/wallet/participations'>
                            <div className="w-full flex justify-end hover:bg-gray-400 p-2">
                            participations 
                            </div>
                        </Link>
                        <Link >
                            <div className="w-full flex justify-end hover:bg-gray-400 p-2">
                                logout
                            </div>
                        </Link>
                        
                        
                    </div>}
                </div>    
            </div>
            
            
            
        </div>
        
    </div>
}

export default Header;