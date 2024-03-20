import React, {useState, useEffect} from 'react';
import TodoComponent from './TodoComponent';
import moment from 'moment-timezone';
import '../styles/Home.css';
import useFirebaseUser from '../hooks/useFirebaseUser';
import EditNoteIcon from '@mui/icons-material/EditNote';
// import Particle from  '../Particle';

const Home = ({base_url}) => {
    const listItems = ["Todo", "In-progress", "Done"]
    const [listItemCounts, setItemCounts] = useState([0, 0, 0]);
    const [activeListItem, setActiveListItem] = useState(0);
    const [banner, setBanner] = useState(false);
    const [updateBanner, setUpdateBanner] = useState(false);
    const user = useFirebaseUser();
    const [displayTasks, setDisplayTasks] = useState([]);
    const [editTodo, setEditTodo] = useState({});

    // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(userTimeZone);

    const insertTodoItem=async (todoInfo)=>{
        try{
            todoInfo.status = "todo";
            todoInfo.status_code = 0;
            
            /* Get the Users Timezone to convert it to UTC in the backend*/
            if (todoInfo.remainderTime){
                todoInfo.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            }

            const body = {
                user,
                todoInfo
            }
            // console.log(body);
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

    const updateTodo = async (todoObject) => {
        try {
            await fetch(`${base_url}/api/todo/${todoObject._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todoInfo: todoObject.todoInfo})
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
    
    const getLocalReminderTime = (todoInfo) => {
        // Re-instantiate the moment object from the serialized format
        // const remainderMoment = moment.utc(todoInfo.remainderTime._d);
  
        // // Convert to the local time zone
        // return remainderMoment.tz(todoInfo.timeZone).format('YYYY-MM-DDTHH:mm');
        return moment.utc(todoInfo.remainderTime._d).tz(todoInfo.timeZone).format('YYYY-MM-DDTHH:mm');
    }
    useEffect(() => {
        if (user) {
            fetchTodosByUser();
        }
    }, [activeListItem, user]); 
    
    // todoObject = null meanes we are inserting a new items
    // todoObject != null menas we updating an existing item 
    const toggleBanner = (todoInfo=null, todoObject=null, bannerType='create',  toBeEditedTodo=null) =>{
        console.log("Toggle Banner ", bannerType);
        if (bannerType==='create'){
            setBanner(!banner);
        }
        else if (bannerType==='update'){
            setEditTodo(toBeEditedTodo);
            setUpdateBanner(!updateBanner);

        }
        
        
        if (todoInfo) {
            if (todoObject===null) {
                insertTodoItem(todoInfo);
            }
            else{
                if (todoInfo.remainderTime){
                    todoInfo.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                }
                // console.log("in toggleBanners todoInfo: ", todoInfo);
                updateTodo({
                    ...todoObject,
                    todoInfo : {
                        ...todoObject.todoInfo,
                        ...todoInfo
                    }
                });
            }
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
                                <li key={index} onClick={()=> setActiveListItem(index)} className={classes.join(' ')}>
                                    {value}  <p>{displayTasks.filter(todo=> todo.todoInfo.status_code === index).length}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="addTodo">
                        <button className="addTodo-button" onClick={toggleBanner}> <p className='addTodo-button-p1'>Add Todo</p><p className='addTodo-button-p2'>+</p></button>
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
                                                // if (todo.remainderTime){
                                                //     todo.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                                // }
                                                updateTodo({
                                                    ...todo, 
                                                    todoInfo: {
                                                        ...todo.todoInfo,
                                                        status: newStatus,
                                                        status_code: parseInt(newStatusCode),
                                                        remainderTime: todo.todoInfo.remainderTime? getLocalReminderTime(todo.todoInfo): '',
                                                    }
                                                });
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
                                    <div className="edit-todo">
                                            
                                            <button className="edit-todo-button" onClick={(e)=>toggleBanner(undefined, undefined, 'update', todo)}><EditNoteIcon style={{marginRight: '10px'}}/> Edit</button>
                                            {
                                                updateBanner && 
                                                <TodoComponent toggleBanner={toggleBanner} todoObject={editTodo} />
                                            }
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