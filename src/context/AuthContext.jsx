import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('track_inventory_token');
    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch('/auth/profile')
      .then(setUser)
      .catch(() => localStorage.removeItem('track_inventory_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem('track_inventory_token', data.token);
    setUser(data.user);
  };

  const register = async (fullName, email, password) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password })
    });
    localStorage.setItem('track_inventory_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('track_inventory_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
