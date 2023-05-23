import React, { useState } from 'react'
import './todolist.css'
import { BsFillTrashFill } from 'react-icons/bs';

const TodoList = () => {

    const [toDo, setToDo] = useState("");
    const [items, setItems] = useState([]);

    function addItem() {

        if(!toDo) {
            alert("You have to enter a to-do")
            return;
        }

        const item = {
            id: Math.floor(Math.random() * 1000),
            value: toDo
        }

        setItems(oldList => [...oldList, item]);
        setToDo("");
    }

    function deleteItem(id) {
        const deleteToDo = items.filter(item => item.id !== id);
        setItems(deleteToDo);
    }

  return (
    <>
     <input type="text"
     className='todo-input'
     placeholder='Add a to-do'
     value={toDo}
     onChange={e => setToDo(e.target.value)}
     />

     <button 
     onClick={() => addItem()}
     className='todo-btn'
     >
        Add Task
    </button> 

     <ul>
        {items.map(item => {
            return(
                <li key={item.id}
                className='todo-element'
                >
                    {item.value}
                    <BsFillTrashFill onClick={() => deleteItem(item.id)}/>
                </li>
            )
        })}
     </ul>
    </>
  )
}

export default TodoList
