import React from 'react';
import { useHistory } from 'react-router-dom';
import './AdminRoleSelection.css';

const AdminRoleSelection = () => {
  const history = useHistory();

  const roles = [
    {
      name: 'Core',
      role: 'core',
      description: 'System-level administration',
      color: '#0f766e',
      path: '/admin/core'
    },
    {
      name: 'Coordinator',
      role: 'coordinator',
      description: 'Event operations and updates',
      color: '#2563eb',
      path: '/admin/coordinator'
    },
    {
      name: 'Volunteer',
      role: 'volunteer',
      description: 'Event monitoring and support',
      color: '#9333ea',
      path: '/admin/volunteer'
    }
  ];

  const handleRoleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="admin-role-selection">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">TechStorm Admin Portal</h1>
          <p className="admin-subtitle">Select your role</p>
        </div>

        <div className="role-cards-container">
          {roles.map((role) => (
            <div
              key={role.role}
              className="role-card"
              onClick={() => handleRoleClick(role.path)}
              style={{ '--role-color': role.color }}
            >
              <div className="role-chip">{role.role.toUpperCase()}</div>
              <h2 className="role-name">{role.name}</h2>
              <p className="role-description">{role.description}</p>
              <button className="role-button">Continue</button>
            </div>
          ))}
        </div>

        <div className="admin-footer">
          <p>2026 TechStorm. Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminRoleSelection;
