import { useEffect, useState } from "react";
import Prize from "./prize";

function AddPrizes({type,prizes,setPrizes}){ //type= lottery || raffle
    let addPrizeValDefault;
    let inputType;
    let show_percentages = false;
    if(type==='lottery'){
        inputType = 'number';
        show_percentages = true;
        addPrizeValDefault = 0;
    }else if(type==='raffle'){
        inputType = 'text';
        addPrizeValDefault = '';
    }

    const [showAddPrize,setShowAddPrize] = useState(false);
    const [addPrizeVal,setAddPrizeVal] = useState(addPrizeValDefault);

    const onChangePrizeVal = (event) => {
        if(event.target.value > 100){
            return
        }
        setAddPrizeVal(event.target.value);
    }

    const onSaveAddPrize = () => {
        if(addPrizeVal === 0 || addPrizeVal>100){
            return
        };
        if(type==='lottery'){
            addPrize(Number(addPrizeVal));    
        }else if(type==='raffle'){
            addPrize(addPrizeVal)
        }
        
        setAddPrizeVal(addPrizeValDefault);
        setShowAddPrize(false);
    }
    const addPrize = (prize) => {
        setPrizes([...prizes,prize])
    }

    const editPrize = (index,newPrize) => {
        let newPrizes = [...prizes];
        newPrizes[index] = newPrize;
        setPrizes(newPrizes);
    }

    const removePrize = (index) => {
        let newPrizes = [...prizes];
        newPrizes.splice(index,1);
        setPrizes(newPrizes);
    }

    const deleteSvg = <svg onClick={()=>{
        setAddPrizeVal(addPrizeValDefault);
        setShowAddPrize(false);
    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>

    let val = 0;

    useState(()=>{
        val = 0;
    },[prizes])

    console.log('prizes',prizes)
    const renderedPrizes = prizes.map((prize,i) => {
        if(type==="lottery"){

            val = val + prize;
            
        }
        return <Prize type={type} value={prize} editPrize={editPrize} key={i} index={i} removePrize={removePrize}/>
    } )
    
    //BG COLOR DEPENDS IF SUM AMOUNT IS VALID
    let bg_color;
    let message;
    if(val > 100){
        message = <div className="text-xl text-white">The sum of prizes must be less than 100% of the total value</div>
        bg_color = "bg-red-500"
    }else{
        message=<div></div>
        bg_color = "bg-gray-200"
    }

    const inputNewPrize = <div className="bg-white p-2 rounded mt-1 border-b border-grey  hover:bg-grey-lighter flex justify-between">
                                <div className="flex gap-2">
                                    <div>{prizes.length+1}.</div>
                                    <input onChange={onChangePrizeVal} type={inputType} value={addPrizeVal} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-0 focus:outline-none" placeholder="" required/>
                                    {show_percentages&& '%'}
                                </div>
                                <div className="flex gap-2 items-center">
                                    {deleteSvg}
                                    <div onClick={onSaveAddPrize} className="bg-blue-600 flex text-white font-bold p-2 w-14 cursor-pointer">
                                        Save
                                    </div>
                                </div>
                            </div>
        
    return <div className={`flex flex-col rounded ${bg_color} md:w-96 p-2 gap-1`}>
        <div className="flex justify-between py-1">
      	    <h3 className="text-lg font-bold text-gray-800">Prizes <div className="text-sm">{type==="lottery"&&message}{type==="lottery"&&"(percentage of total prizepool amount)"}</div></h3>
        </div>
        <div>
            {renderedPrizes}
        </div>
        {showAddPrize && inputNewPrize}
        <div onClick={()=>{setShowAddPrize(true);}} className="bg-blue-600 flex text-white font-bold p-2 w-24 cursor-pointer">
            Add Prize
        </div>
    </div>
}

export default AddPrizes;


// <div class="bg-blue w-full p-8 flex justify-center font-sans">
// <div class="rounded bg-grey-light w-64 p-2">
//   <div class="flex justify-between py-1">
//   	<h3 class="text-sm">New landing page</h3>
//     <svg class="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
//   </div>
//   <div class="text-sm mt-2">
//   	<div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
//         Do a mobile first layout
// 	</div>
    
//   	<div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
//         Check the meta tags
// 	</div>
    
//   	<div class="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
//         Check the responsive layout on all devices
//       	<div class="text-grey-darker mt-2 ml-2 flex justify-between items-start">
//           	<span class="text-xs flex items-center">
//       			<svg class="h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z"/></svg>
//               	3/5
//           	</span>
//           	<img src="https://i.imgur.com/OZaT7jl.png" class="rounded-full" />
//       	</div>
// 	</div>
//     <p class="mt-3 text-grey-dark">Add a card...</p>
//   </div>
// </div>
// </div>