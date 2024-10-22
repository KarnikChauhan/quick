import React from 'react';

const Navbar = ({ onGroupingChange, onSortChange }) => {
  return (
    <div className="navbar">
      <select onChange={(e) => onGroupingChange(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
};

export default Navbar;
