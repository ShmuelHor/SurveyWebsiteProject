import './App.css';
import { useState } from 'react';
import { useAppDispatch } from './store/hooks'; 
import { registerUser, loginUser, selectUser } from './store/features/users/usersSlice';
import { User, UserData } from './types';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const User:UserData|null = useSelector(selectUser);
  const handleRegister = () => {
    const user: User = { username, password };
    dispatch(registerUser(user));
  };

  const handleLogin = () => {
    const user: User = { username, password };
    dispatch(loginUser(user));
  };

  return (
    <div className="App">
        <h1>{User?.message}</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      
      <button onClick={handleRegister}>Register User</button>
      <button onClick={handleLogin}>Login User</button>
    </div>
  );
}

export default App;
