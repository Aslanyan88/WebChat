import React, { useState } from 'react';
import './addUser.css';

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const [username, setUsername] = useState(''); 

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      console.log('User added:', username);
      setUsername(''); 
      setIsModalOpen(false); 
    } else {
      alert('Please enter a username');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add a User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Add User
              </button>
              <button type="button" className="close-btn" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
