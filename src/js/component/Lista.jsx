import React from "react";
import Elemento from "./Elemento.jsx"

const Lista = ({arr, deleteTask, isCompleted}) => {
    return ( <ul>
        {arr.map((elemento, i)=>
            <Elemento key={i} data={elemento} deleteTask={deleteTask} i={i} isCompleted={isCompleted}/>
        )}
    </ul>
    )
}
export default Lista