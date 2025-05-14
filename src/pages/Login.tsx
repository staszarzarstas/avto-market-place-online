
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/lib/user-store';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // If already logged in, redirect to profile
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await login(loginData.email, loginData.password);
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    
    try {
      setIsLoading(true);
      await register(registerData.name, registerData.email, registerData.password);
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update login form data
  const updateLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  
  // Update register form data
  const updateRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-autogray py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        name="email"
                        type="email" 
                        placeholder="ваш@email.com" 
                        value={loginData.email}
                        onChange={updateLoginData}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password">Пароль</Label>
                      <Input 
                        id="login-password" 
                        name="password"
                        type="password" 
                        value={loginData.password}
                        onChange={updateLoginData}
                        required 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link to="/forgot-password" className="text-autoblue hover:underline">
                          Забыли пароль?
                        </Link>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-autoblue hover:bg-autoblue-light"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Загрузка...' : 'Войти'}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-600 mt-4">
                      <p>Для демо-входа используйте:</p>
                      <p className="font-mono bg-gray-100 p-1 rounded mt-1">ivan@example.com / password123</p>
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="register-name">Имя</Label>
                      <Input 
                        id="register-name" 
                        name="name"
                        type="text" 
                        placeholder="Иван Иванов" 
                        value={registerData.name}
                        onChange={updateRegisterData}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        name="email"
                        type="email" 
                        placeholder="ваш@email.com" 
                        value={registerData.email}
                        onChange={updateRegisterData}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="register-password">Пароль</Label>
                      <Input 
                        id="register-password" 
                        name="password"
                        type="password" 
                        value={registerData.password}
                        onChange={updateRegisterData}
                        required 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="register-confirm-password">Повторите пароль</Label>
                      <Input 
                        id="register-confirm-password" 
                        name="confirmPassword"
                        type="password" 
                        value={registerData.confirmPassword}
                        onChange={updateRegisterData}
                        required 
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-autoblue hover:bg-autoblue-light"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
