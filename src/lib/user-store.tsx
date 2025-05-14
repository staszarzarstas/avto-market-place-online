
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserContextType } from './types';
import { useToast } from '@/components/ui/use-toast';

// Create the context
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure user has favorites array (for backward compatibility)
        if (!parsedUser.favorites) {
          parsedUser.favorites = [];
        }
        // Ensure user has orders array (for backward compatibility)
        if (!parsedUser.orders) {
          parsedUser.orders = [];
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Get users from localStorage
    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);
    
    // Find user by email
    const userFound = users.find((u: any) => u.email === email);
    
    if (!userFound) {
      throw new Error('Пользователь не найден');
    }
    
    if (userFound.password !== password) {
      throw new Error('Неверный пароль');
    }
    
    // Create user object (without password)
    const loggedInUser: User = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      avatar: userFound.avatar,
      favorites: userFound.favorites || [],
      orders: userFound.orders || []
    };
    
    // Save to state and localStorage
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
    toast({
      title: "Успешный вход",
      description: `Добро пожаловать, ${userFound.name}!`,
    });
  };
  
  const register = async (name: string, email: string, password: string) => {
    // Get existing users
    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);
    
    // Check if email already exists
    if (users.some((user: any) => user.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, you would hash this password
      favorites: [],
      orders: []
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log user in (without password in state)
    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      favorites: [],
      orders: []
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
    toast({
      title: "Регистрация успешна",
      description: `Добро пожаловать, ${name}!`,
    });
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
    });
  };

  const toggleFavorite = (productId: number) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите или зарегистрируйтесь, чтобы добавить товар в избранное",
        variant: "destructive"
      });
      return;
    }

    // Create a copy of the current user
    const updatedUser = { ...user };
    
    // Check if product is already in favorites
    const index = updatedUser.favorites.indexOf(productId);
    
    if (index === -1) {
      // Add to favorites
      updatedUser.favorites = [...updatedUser.favorites, productId];
      toast({
        title: "Добавлено в избранное",
        description: "Товар добавлен в список избранного"
      });
    } else {
      // Remove from favorites
      updatedUser.favorites = updatedUser.favorites.filter(id => id !== productId);
      toast({
        title: "Удалено из избранного",
        description: "Товар удален из списка избранного"
      });
    }
    
    // Update state and localStorage
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update user in users array
    const usersStr = localStorage.getItem('users') || '[]';
    const users = JSON.parse(usersStr);
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], favorites: updatedUser.favorites };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const isFavorite = (productId: number): boolean => {
    if (!user) return false;
    return user.favorites.includes(productId);
  };
  
  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
