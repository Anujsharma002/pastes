import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPaste } from '../redux/pasteSlice';


const Home = () => {
    const [Text,setText] = useState('');
    const [value,setValue] = useState('');
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allpasteId = useSelector((state) => state.pastes.pastes);
    const dispatch = useDispatch();

    useEffect(
      ()=>{
        if(pasteId){
          const paste = allpasteId.find((p)=>p._id === pasteId);
          setText(paste.title);
          setValue(paste.content);
        }   
      },[pasteId]);

    function createPaste(){
           const paste = {
               title:Text,
               content:value,
               _id:pasteId || Date.now().toString(36),
               createdAt:new Date().toISOString(),
           }

           if(pasteId){
            //update
            console.log("updtae is called");
            dispatch(updateToPaste(paste));
           }
           else{
            //create
            dispatch(addToPastes(paste));
           }

           setText('');
           setValue('');
           setSearchParams({});
    }
    

  return (
    <div>
      <div className='flex flew-row gap-7 place-content-between'>
      <input 
      type="text"
      value={Text}
      onChange={(e)=>{setText(e.target.value)}}
      className='bg-blue-200 p-0.5 rounded-2xl mt-3 pl-4 w-[66%]'
      placeholder='Enter Title here'
       />
      <button className='p-3 rounded-3xl mt-2 border-2 border-red-50 hover:border-blue-500'
        onClick={createPaste}
       >
        {pasteId?"Update My Paste":"Create My Paste"}
        </button>
      </div>
      <div className='mt-8'>
        <textarea
         placeholder='Enter Your Text here'
         rows={20}
         
         className='min-w-[500px] bg-amber-100 mt-4 rounded-2xl p-4'
         value={value}
         onChange={(e)=>setValue(e.target.value)}
         >

        </textarea>
      </div>
    </div>
  )
}

export default Home
Home