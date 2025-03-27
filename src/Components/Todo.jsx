import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import { FaAccessibleIcon } from "react-icons/fa";

const Todo = () => {
  const [tododata, settododata] = useState(JSON.parse(localStorage.getItem("tododata")));
  const inputref = useRef();

  const add = () => {
    const inputdata = inputref.current.value.trim();
    if (inputdata === "") {
      return null;
    }
    const data = {
      id: Date.now(),
      text: inputdata,
      isCompleted: false,
    };
    settododata((prev) => [...prev, data]);
    inputref.current.value   = "";
  };

  const deletetodo = (id) =>
    settododata((prev) => {
      return prev.filter((item) => item.id !== id);
    });

  const toggle = (id) => {
    settododata((prev) => {
      return prev.map((item, index) => {
        if(item.id === id){
          return { ...item, isCompleted: !item.isCompleted };
        }
        else
         return item;
      });
    });
  };

  useEffect(()=>{
    localStorage.setItem("tododata",JSON.stringify(tododata))
  },[tododata])

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl ">
      {/* title */}

      <div className=" flex items-center mt-7 gap-4  ">
        <FaAccessibleIcon className="text-3xl" />
        <h1 className=" text-3xl font-semibold ">to do list</h1>
      </div>

      {/* input box */}

      <div className=" flex items-center my-7 bg-gray-200 rounded-full ">
        <input
          ref={inputref}
          className=" bg-transparent border-0 outline-none flex-1 h-14 pl-14 pr-2 placeholder:text-slate-600 "
          type="text"
          placeholder="Add your task"
          name=""
          id=""
        />
        <button
          onClick={add}
          className=" border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer  "
        >
          Add +
        </button>
      </div>

      {/* todo list */}

      <div>
        {tododata.map((item, index) => (
          <Todoitems
            key={item.id}
            text={item.text}
            index={index}
            id={item.id}
            deletetodo={deletetodo}
            toggle={toggle}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
