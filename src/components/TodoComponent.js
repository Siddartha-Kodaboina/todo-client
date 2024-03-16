import React, {useState} from 'react';
import '../styles/TodoComponent.css';

const TodoComponent = ({ toggleBanner, todoObject=null }) => {
  // Dummy data for categories and tags, replace with your own logic
    const tags = ["XDR mode", "HDR", "Mac 3 Pro"];
    console.log("todoObject in todoObject", todoObject);
    const update = todoObject!==null? 'update': 'create';
    const callToggleBanner = (e) => {
        if (e.target.name === "save") {
            toggleBanner(data, todoObject, update);
        }else{
            toggleBanner(undefined, undefined, update);
        }
    }
    const [data, setData] = useState({
      task: todoObject!==null ? todoObject.todoInfo.task: '',
      description: todoObject!==null ? todoObject.todoInfo.description: '',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    };
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
