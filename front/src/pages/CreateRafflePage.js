import { useState } from 'react';

import AddPrizes from '../components/addPrizes';
function CreateRuffle(){
    const [prizes,setPrizes] = useState(['prize1','surprise']);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [link,setLink] = useState('');
    const [priceEntrance,setPriceEntrance] = useState(0);

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const onChangeLink = (event) => {
        setLink(event.target.value)
    }

    const onChangeEntrance = (event) => {
        setPriceEntrance(event.target.value);
    }
    
    const handleClickSubmit = async () => {
        if(name.length === 0 || description.length === 0 || link.length === 0 || prizes.length === 0){
            return
        }
        const res = await contractFactory.createRaffle(priceEntrance,name,description,link,prizes);
        console.log(res)
    }

    return <div className="flex w-full justify-center">
        
        <div className="flex flex-col md:flex-row w-11/12 py-2 gap-10">
            <div className='bg-gray-400 md:w-2/3 p-6 flex gap-4 flex-col'>
                <div className='p-2 banner text-gray-200 text-3xl font-bold'>
                    NEW RAFFLE
                </div>
                <div className="flex flex-col gap-2 bg-gray-200 rounded p-4 align-center w-full ">
                    <div className='flex text-lg font-bold text-gray-800'>Raffle Name</div>
                    <input onChange={onChangeName} value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" placeholder="Ocean Raffle " required/>
                </div>

                <div className="flex flex-col gap-2 bg-gray-200 rounded p-4 align-center w-full ">
                    <div className='flex text-lg font-bold text-gray-800'>Raffle Description</div>
                    <input onChange={onChangeDescription} value={description} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" placeholder="Make your imagination fly" required/>
                </div>

                <div className="flex flex-col gap-2 bg-gray-200 rounded p-4 align-center w-full ">
                    <div className='flex text-lg font-bold text-gray-800'>Link(enterprise web,twitch link,...)</div>
                    <input onChange={onChangeLink} value={link} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" placeholder="https://winthisRaffle.com" required/>
                </div>
                
                <div className="flex flex-col gap-2 bg-gray-200 rounded p-4 align-center w-full ">
                    <div className='flex text-lg font-bold text-gray-800'>Price entrance for this Raffle</div>
                    <div className='flex gap-2'>
                        <input onChange={onChangeEntrance} value={priceEntrance} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 focus:outline-none" placeholder="1" required/>
                        <div className='font-bold  text-gray-800 self-center'>hbar</div>
                    </div>
                </div>
                
                <div>
                    <AddPrizes prizes={prizes} setPrizes={setPrizes} type={"raffle"}/>
                </div>

                <div className="flex flex-col gap-2 bg-gray-200 rounded p-4 align-center md:w-96 ">
                    <div className='flex text-lg font-bold text-gray-800'>You are going to receive 95% of every ticket sold</div>
                </div>
                <div className='bg-yellow-200 text-sm w-80 p-2'>
                Once you create a lottery, it cannot be deleted. However, you can create new lotteries as needed. Please review all details carefully before submitting to ensure accuracy.                </div>
                <div onClick={handleClickSubmit} className='blue w-36 h-12 flex justify-center items-center text-white font-bold cursor-pointer'>
                    CREATE Raffle
                </div>
            </div>

            
            <div className='bg-gray-400 w-1/3 p-6'>
                jd
            </div>
                
        </div>
    </div>
}


export default CreateRuffle