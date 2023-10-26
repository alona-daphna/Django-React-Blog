import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../utils/api';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const secret = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (secret.current) {
      const response = await adminLogin(secret.current.value);

      if (response.ok) {
        const token = (await response.json()).token;
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        const error = await response.json();
        setError(error.error);
      }
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin</h1>
      <form>
        <input ref={secret} type="password" placeholder="secret" />
        <button onClick={handleLogin}>Login</button>
      </form>
      {error}
    </div>
  );
};
