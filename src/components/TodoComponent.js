import React, {useState, useEffect} from 'react';
import moment from 'moment-timezone';
import '../styles/TodoComponent.css';

const TodoComponent = ({ toggleBanner, todoObject=null }) => {
  // Dummy data for categories and tags, replace with your own logic
    console.log("todoObject in todoObject", todoObject);
    const update = todoObject!==null? 'update': 'create';
    const [isEdited, setIsEdited] = useState(false);
    const getLocalReminderTime = (todoInfo) => {
      // Re-instantiate the moment object from the serialized format
      // const remainderMoment = moment.utc(todoInfo.remainderTime._d);

      // // Convert to the local time zone
      // return remainderMoment.tz(todoInfo.timeZone).format('YYYY-MM-DDTHH:mm');
      return moment.utc(todoInfo.remainderTime._d).tz(todoInfo.timeZone).format('YYYY-MM-DDTHH:mm');
    }
    const [data, setData] = useState({
      task: todoObject ? todoObject.todoInfo.task: '',
      description: todoObject ? todoObject.todoInfo.description: '',
      remainderTime: todoObject && todoObject.todoInfo.remainderTime? getLocalReminderTime(todoObject.todoInfo): '',
    });

    const callToggleBanner = (e) => {
      if (isEdited) {
        if (e.target.name === "save") {
            toggleBanner(data, todoObject, update);
        }else{
            toggleBanner(undefined, undefined, update);
        }
      }
      else{
        /* If there are no changes/additions on todo window, just toggle the todo window */
        toggleBanner(undefined, undefined, update);
      }
        
    }
    

    const handleChange = (e) => {
        setIsEdited(true);
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    };

    useEffect(()=> {
      console.log("data.remainderTime ", data.remainderTime);
    }, [data.remainderTime])
  return (
    <div className="todo-banner">
      <div className="banner-content">
        <div className="todo-tabs">
          <button className="todo-tab todo-active">INFORMATION</button>
        </div>
        <div className="info-section">
          <div className="form-group">
            <label>Task Name *</label>
            <input type="text" 
                placeholder="Eg: Shared Spaces" 
                name='task'
                value={data.task}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea 
                placeholder='Eg:Set the UI in SharedSpaces App...'
                name='description'
                value={data.description}
                onChange={handleChange}
                rows={7}
                required
            />
          </div>
          <div className="form-group">
            <label>Reminder Time (Optional)</label>
            <input 
              type="datetime-local"
              name="remainderTime"
              value={data.remainderTime} 
              onChange={handleChange}></input>
          </div>
          <div className="form-actions">
            <button className="cancel" name="cancel" onClick={callToggleBanner}>Cancel</button>
            <button className="save" name="save" onClick={callToggleBanner}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
