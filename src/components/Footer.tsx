import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-autoblue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-autored">Deli</span>Night
            </h3>
            <p className="text-gray-300 mb-4">
              Ваш надежный поставщик автомобильных аксессуаров и комплектующих для всех марок и моделей.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-autored transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-autored transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-autored transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-autored transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-autored transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-autored transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-autored transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Категории</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=Интерьер" className="text-gray-300 hover:text-autored transition-colors">
                  Интерьер
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Экстерьер" className="text-gray-300 hover:text-autored transition-colors">
                  Экстерьер
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Электроника" className="text-gray-300 hover:text-autored transition-colors">
                  Электроника
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Тюнинг" className="text-gray-300 hover:text-autored transition-colors">
                  Тюнинг
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Инструменты" className="text-gray-300 hover:text-autored transition-colors">
                  Инструменты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-autored" />
                <span className="text-gray-300">
                  ул. Автомобильная, 42<br />
                  Москва, Россия
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-autored" />
                <a href="tel:+71234567890" className="text-gray-300 hover:text-autored transition-colors">
                  +7 (123) 456-78-90
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-autored" />
                <a href="mailto:info@delinight.ru" className="text-gray-300 hover:text-autored transition-colors">
                  info@delinight.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-autoblue-light mt-8 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} DeliNight. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
