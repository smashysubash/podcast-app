import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import ProtectedRoute from './components/protectedroute';

const App = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('usertoken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken('');
    localStorage.removeItem('usertoken');
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <Login setToken={setToken}  />
          }
        />
        <Route
          path="/home"
          element={
          <ProtectedRoute  Component={Home}
            token={token}
            logout={logout}
          />}
        />
      </Routes>
    </Router>
  );
};

export default App;
