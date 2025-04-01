import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes.pastes) || [];
  const [searchTerm,setSeachTerm] = useState('');
  const dispatch = useDispatch();
  const filterData = pastes.filter(
    (paste) => {
        return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
);
  console.log(filterData)
  console.log(pastes)

function handleDelete(pasteId){
  dispatch(removeToPaste({ _id: pasteId }));
  // console.log("del",pasteId);
}
  return (
    <div>
      <input 
      className='p-2 min-w-[600px] rounded-2xl mt-5 border-1 border-amber-300'
      type="search"
      placeholder='search here'
      value={searchTerm}
      onChange={(e)=>setSeachTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filterData.length >=0 && filterData.map(
            (paste)=>{
              return(
                <div className='border-2'>
                  <div>
                      {paste.title}
                    </div>
                    <div>
                      {paste.content}
                    </div>
                    <div className='flex flex-row gap-4 place-content-evenly'>
                      <button className='p-2 m-2 rounded-[5px]' style={{"background-color":'purple','color':'white'}}
                      
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                        </a></button>
                      <button className='p-2 m-2 rounded-[5px]' style={{"background-color":'purple','color':'white'}}
                      ><a href={`/pastes/${paste?._id}`}>View</a></button>
                      <button className='p-2 m-2 rounded-[5px]' style={{"background-color":'purple','color':'white'}} onClick={()=>handleDelete(paste?._id)}>Delete</button>
                      <button
                       onClick={()=>{
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard");
                       }}
                       className='p-2 m-2 rounded-[5px]' style={{"background-color":'purple','color':'white'}}
                      >Copy</button>
                      <button
                      className='p-2 m-2 rounded-[5px]' style={{"background-color":'purple','color':'white'}}
                      >Share</button>
                    </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Pastes
