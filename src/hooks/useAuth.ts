import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [user, setUser] = useState<any>(null);

  const login = () => {
    // Пока просто заглушка
    console.log('Login clicked - OAuth будет позже');
    // Для теста установим тестовый токен
    localStorage.setItem('github_token', 'test_token');
    setToken('test_token');
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setToken(null);
    setUser(null);
  };

  return { token, user, login, logout };
}
