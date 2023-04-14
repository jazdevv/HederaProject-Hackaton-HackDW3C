import { useState } from "react"

function Prize({type,editPrize,value,index,removePrize}){
    
    const [prizeValue,setPrizeValue] = useState(value);
    const [editingValue,setEditingValue] = useState(value);
    const [editing,setEditing] = useState(false);
    
    const onChange = (event)=>{
        if(event.target.value>100){
            return
        }
        if(type==='lottery'){
          setEditingValue(Number(event.target.value));  
        }else if(type==='ruffle'){
            setEditingValue(event.target.value)
        }
        
    }
    const editingTrue = () => {
        setEditing(true);
    }

    const editingFalse = () => {
        setEditing(false);
    }

    const onSave = () => {
        if(editingValue===0 || editingValue>100){
            editingFalse();
            console.log('return')
            return
        }
        console.log('return false')
        setPrizeValue(editingValue);
        editPrize(index,editingValue)
        editingFalse();
    }

    const deleteSvg = <svg onClick={()=>{removePrize(index)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>

    const editSvg = <svg onClick={editingTrue} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
  
    
    
    if(type==='lottery'){
        if(editing){
            return<div className="bg-white p-2 rounded mt-1 border-b border-grey  hover:bg-grey-lighter flex justify-between">
                    <div className="flex gap-2">
                        <div>{index+1}.</div> 
                        <input onChange={onChange} type="number" value={editingValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-0 focus:outline-none" placeholder="1" required/>
                    % </div>
                    <div className="flex gap-2">
                    <div onClick={onSave} className="bg-blue-600 flex text-white font-bold p-2 w-14 cursor-pointer">
                        Save
                    </div>
                    </div>
                </div>  
            
        }else{
          return <div className="bg-white p-2 rounded mt-1 border-b border-grey  hover:bg-grey-lighter flex justify-between">
                    <div>{index+1}. {prizeValue}% </div>
                    <div className="flex gap-2">
                        {deleteSvg}
                        {editSvg}
                    </div>
                </div>  
        }
        
    }else if(type==='raffle'){
        if(editing){
            return<div className="bg-white p-2 rounded mt-1 border-b border-grey  hover:bg-grey-lighter flex justify-between">
                    <div className="flex gap-2">
                        <div>{index+1}.</div> 
                        <input onChange={onChange} type="number" value={editingValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 py-0 focus:outline-none" placeholder="1" required/>
                     </div>
                    <div className="flex gap-2">
                    <div onClick={onSave} className="bg-blue-600 flex text-white font-bold p-2 w-14 cursor-pointer">
                        Save
                    </div>
                    </div>
                </div>  
            
        }else{
          return <div className="bg-white p-2 rounded mt-1 border-b border-grey  hover:bg-grey-lighter flex justify-between">
                    <div>{index+1}. {prizeValue} </div>
                    <div className="flex gap-2">
                        {deleteSvg}
                        {editSvg}
                    </div>
                </div>  
        }
    }
}
export default Prize;