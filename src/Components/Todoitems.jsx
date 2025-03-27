import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { MdDelete } from "react-icons/md";



const Todoitems = ({text,index,id,deletetodo,toggle,isCompleted}) => {
  return (
    <div key={index} className=' flex  items-center my-3 gap-2  '>
          <div onClick={()=>toggle(id)} className=' flex flex-1 items-center cursor-pointer '>
            {isCompleted ?  <FaCheckCircle className='w-9 text-[25px]' /> : <ImRadioUnchecked className='w-9 text-[25px]' /> }
                
                    <p className={`text-slate-700 ml-4 text-[17px] ${isCompleted ? "line-through" : ""}`}>{text}</p>
          </div>
          <MdDelete onClick={()=>deletetodo(id)} className=' text-[25px]'/>
    </div>
  )
}

export default Todoitems
