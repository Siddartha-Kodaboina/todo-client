import React, {useState, useEffect} from 'react';
import TodoComponent from './TodoComponent';
import '../styles/Home.css';
import useFirebaseUser from '../hooks/useFirebaseUser';

const Home = ({base_url}) => {
    const listItems = ["Todo", "In-progress", "Done"]
    const [listItemCounts, setItemCounts] = useState([0, 0, 0]);
    const [activeListItem, setActiveListItem] = useState(0);
    const [banner, setBanner] = useState(false);
    const user = useFirebaseUser();
    const [displayTasks, setDisplayTasks] = useState([]);

    console.log(base_url);

    const insertTodoItem=async (todoInfo)=>{
        try{
            todoInfo.status = "todo";
            todoInfo.status_code = 0;
            const body = {
                user,
                todoInfo
            }
            console.log(body);
            await fetch(`${base_url}/api/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log("The response", data);
              fetchTodosByUser();
            })
            .catch(error => {
              console.error("Error fetching data: ", error);
            });
            
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchTodosByStatus = async () => {
        try {
            const response = await fetch(`${base_url}/api/todo/${user.uid}/${activeListItem}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDisplayTasks(data.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const fetchTodosByUser = async () => {
        try {
            const response = await fetch(`${base_url}/api/todo/${user.uid}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDisplayTasks(data.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const updateTodoStatus = async (todoId, newStatus, newStatusCode) => {
        console.log("Updating status: " + newStatusCode);
        try {
            await fetch(`${base_url}/api/todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus, status_code: newStatusCode })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Todo status updated", data);
                fetchTodosByUser(); // Refresh the list after updating
            })
            .catch(error => {
                console.error("Error updating todo status:", error);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    useEffect(() => {
        if (user) {
            fetchTodosByUser();
        }
    }, [activeListItem, user]); 
    

    const toggleBanner = (todoInfo=null) =>{
        console.log("Toggle Banner");
        setBanner(!banner);
        // console.log(todoInfo);
        if (todoInfo){
            insertTodoItem(todoInfo);
        }
    }
    return (
        <div className="home">
            <div className="home-container">
                <div className="top-headers">
                    <ul className="headers">
                        {listItems.map((value, index) => {
                            const classes = ["header-li"];
                            if (activeListItem === index) {
                                classes.push("active");
                            }
                            return (
                                <li key={index} onClick={()=> setActiveListItem(index)}className={classes.join(' ')}>
                                    {value}  <p>{displayTasks.filter(todo=> todo.todoInfo.status_code === activeListItem).length}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="addTodo">
                        <button onClick={toggleBanner}>Add Todo</button>
                        {
                            banner && 
                            <TodoComponent toggleBanner={toggleBanner} />
                        }
                    </div>
                </div>
                <div className="bottom-content">
                    YOUR {listItems[activeListItem]} Tasks
                    <div className="todo-list">
                        {displayTasks.filter(todo=> todo.todoInfo.status_code === activeListItem)
                            .map((todo, index) => (
                            <div key={index} className="todo-item">
                                <div className="todo-item-left">
                                    <h3>{todo.todoInfo.task}</h3>
                                    <p>{todo.todoInfo.description}</p>
                                </div>
                                <div className="todo-item-right">
                                    <div className="select-style">
                                        Update Status: {'    '}
                                        <select
                                            value={todo.todoInfo.status}
                                            onChange={(e) => {
                                            const [newStatus, newStatusCode] = e.target.value.split(',');
                                            updateTodoStatus(todo._id, newStatus, parseInt(newStatusCode));
                                            }}
                                        >   
                                            {listItems.filter(item => item.toLowerCase() === todo.todoInfo.status).map((status, idx) => (
                                                <option key={idx} value={`${status.toLowerCase()},${listItems.indexOf(status)}`}>{status}</option>
                                            ))}
                                            {listItems.filter(item => item.toLowerCase() !== todo.todoInfo.status).map((status, idx) => (
                                                <option key={idx} value={`${status.toLowerCase()},${listItems.indexOf(status)}`}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;