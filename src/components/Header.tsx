import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { useUser } from '@/lib/user-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-autoblue text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <span className="text-autored mr-1">Deli</span>Night
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-autored transition-colors">Главная</Link>
            <Link to="/catalog" className="hover:text-autored transition-colors">Каталог</Link>
            <Link to="/about" className="hover:text-autored transition-colors">О нас</Link>
            <Link to="/contact" className="hover:text-autored transition-colors">Контакты</Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-white hover:text-autored">
              <Button variant="ghost" size="icon" className="text-white hover:text-autored">
                <Search size={20} />
              </Button>
            </Link>
            
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-autored">
                  {isAuthenticated && user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">Личный кабинет</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">Мои заказы</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                      Выйти
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="cursor-pointer">Войти</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login?tab=register" className="cursor-pointer">Регистрация</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-autored">
                <ShoppingCart size={20} />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-autored text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/search" className="mr-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-autored p-1">
                <Search size={20} />
              </Button>
            </Link>
            <Link to="/cart" className="relative mr-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-autored p-1">
                <ShoppingCart size={20} />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-autored text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:text-autored p-1">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 border-t border-autoblue-light mt-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={toggleMenu} className="hover:text-autored transition-colors">Главная</Link>
              <Link to="/catalog" onClick={toggleMenu} className="hover:text-autored transition-colors">Каталог</Link>
              <Link to="/about" onClick={toggleMenu} className="hover:text-autored transition-colors">О нас</Link>
              <Link to="/contact" onClick={toggleMenu} className="hover:text-autored transition-colors">Контакты</Link>
              <div className="pt-2 border-t border-autoblue-light">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center mb-3">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      ) : (
                        <User size={20} className="mr-2" />
                      )}
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs opacity-70">{user?.email}</div>
                      </div>
                    </div>
                    <Link to="/profile" onClick={toggleMenu} className="block py-2 hover:text-autored transition-colors">
                      Личный кабинет
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }} 
                      className="w-full text-left py-2 text-red-300 hover:text-red-100 transition-colors"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu} className="block py-2 hover:text-autored transition-colors">
                      Войти
                    </Link>
                    <Link to="/login?tab=register" onClick={toggleMenu} className="block py-2 hover:text-autored transition-colors">
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
