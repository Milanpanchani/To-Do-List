import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import { FaAccessibleIcon } from "react-icons/fa";

const Todo = () => {
  const [tododata, settododata] = useState(JSON.parse(localStorage.getItem("tododata")) || []);
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
    <div className="bg-white place-self-center w-6/7 md:w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl ">
      {/* title */}

      <div className=" flex items-center mt-7 gap-4  ">
        <FaAccessibleIcon className="text-3xl" />
        <h1 className=" text-3xl font-semibold ">to do list</h1>
      </div>

      {/* input box */}

      <div className=" my-7 bg-gray-200 rounded-full overflow-hidden  flex items-center justify-between ">
        <input
          ref={inputref}
          className=" w-4/5 outline-none pl-7 md:pl-10 md:pr-2 placeholder:text-slate-600 border-0 "
          type="text"
          placeholder="Add your task"
          name=""
          id=""
        />
        <button
          onClick={add}
          className=" border-none rounded-full bg-orange-600 w-25 md:w-32 h-12 md:h-14 text-white text-md md:text-lg font-medium cursor-pointer  "
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
