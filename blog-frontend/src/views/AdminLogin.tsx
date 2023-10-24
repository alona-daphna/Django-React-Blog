import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // if secret valid
    if (true) {
      // set token in local storage
      navigate('/');
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin</h1>
      <form>
        <input type="text" placeholder="secret" />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};
