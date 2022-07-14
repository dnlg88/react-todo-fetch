import React from "react";
import {AiOutlineClose} from 'react-icons/ai'

const Elemento = ({data, deleteTask, i, isCompleted})=> {

    return (<div className="list-element">
            <li className={data.done ? "completed":""} onClick={()=>isCompleted(i)}>
                {data.label}
            </li>
            {data.done === true ? <a className="trash" onClick={()=>deleteTask(data)}>
                                <AiOutlineClose /> 
                                </a> : <></>}
    </div>
    )
}
export default Elemento