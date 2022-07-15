import React, {useState, useEffect} from "react";
import Lista from "./Lista.jsx"

//create your first component
const Home = () => {
	
	const [toDoList, setToDoList] = useState([])
	const [inputValue, setInputValue] = useState("")
	let user = 'danielgzm'
	

	const get = ()=>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`)
    	.then(resp => {
			console.log(resp.ok)
			if(!resp.ok){
				createUser()
			}
        	return resp.json();
    	})
    	.then(data => {
       	 setToDoList(data)
    	})
    	.catch(error => {
        
      	  console.log(error);
    	});
	}

	useEffect(()=>{
		get()
	},[])

	const put = (aux)=>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
      	method: "PUT",
      	body: JSON.stringify(aux),
      	headers: {
        	"Content-Type": "application/json"
      	}
    	}).then(resp => {
        	if(resp.ok){
				get()
			}
			return resp.json;
    	})
    	.then(data => {
        	console.log(data);
    	})
    	.catch(error => {
        console.log(error.message);
    	});}

	const createUser = ()=>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify([])
		})
		.then(response => {
			if(response.ok){
				get()
			}
			return response.json();
		})
		.then(data => {
			console.log(data.result)
		})
		.catch(error => {
			console.log(error)
		})
	}

	const addToDo = (input) => {
		let aux = [...toDoList]
		const newToDo = {};
		newToDo.label = input
		newToDo.done = false
		aux.push(newToDo)
		setToDoList([...toDoList, newToDo])
		put(aux)
	}

	const deleteTask = (element) => {
		if (toDoList.length == 1){
			nukeToDo()
		} else if(toDoList.length > 1){
			let aux = toDoList.filter(el=> el!= element)
			setToDoList(aux)
			put(aux)
		} 
	}

	const nukeToDo = ()=>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			},
		})
		.then(response=>{
			if(response.ok){
				createUser()
			}
		})
	}

	const isCompleted = (i)=>{
		let updatedList = toDoList.map((item,j,arr)=>{
			if((j) === i && item.label === arr[i].label){
				return {...item, done:!(item.done)}
			}
			return item
		})
		setToDoList(updatedList)
		put(updatedList)
    }

	return (
		<div className="main">
			<h1>todos</h1>
			<div className="container">
				<div className="tarjeta">
					<input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="What needs to be done?" 
					onKeyDown={(e)=>{
						if(e.key === 'Enter'){
							if(e.target.value.trim()){
							addToDo(e.target.value)
							setInputValue("")
							}
						}}
					}  />
					<Lista arr={toDoList} deleteTask={deleteTask} isCompleted={isCompleted}/>
					<p>{toDoList.length} items left</p>
					<button className="nuke" onClick={()=>nukeToDo()}>Delete Everything</button>
				</div>
			</div>
		</div>
	)
};

export default Home;