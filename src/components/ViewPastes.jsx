import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'





const ViewPastes = () => {
  const {id} = useParams();
const allpastes = useSelector((state)=>state.pastes.pastes);

const paste = allpastes.filter(
  (p)=>p._id === id
)[0];
  return (
    <div>
      <div className='flex flew-row gap-7 place-content-between'>
      <input 
      type="text"
      value={paste.title}
      onChange={(e)=>{setText(e.target.value)}}
      className='bg-blue-200 p-0.5 rounded-2xl mt-3 pl-4 w-[66%]'
      placeholder='Enter Title here'
      disabled
       />
      </div>
      <div className='mt-8'>
        <textarea
         placeholder='Enter Your Text here'
         rows={20}
         
         className='min-w-[500px] bg-amber-100 mt-4 rounded-2xl p-4'
         value={paste.content}
         onChange={(e)=>setValue(e.target.value)}
         disabled
         >

        </textarea>
      </div>
    </div>
  )
}

export default ViewPastes
