import React, {useState} from 'react';
import '../styles/TodoComponent.css';

const TodoComponent = ({ toggleBanner }) => {
  // Dummy data for categories and tags, replace with your own logic
    const tags = ["XDR mode", "HDR", "Mac 3 Pro"];
    const callToggleBanner = (e) => {
        if (e.target.name === "save") {
            toggleBanner(data);
        }else{
            toggleBanner();
        }
    }
    const [data, setData] = useState({});
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
