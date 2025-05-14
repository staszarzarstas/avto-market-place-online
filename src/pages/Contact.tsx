import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Создаем новое сообщение
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString()
      };

      // Получаем существующие сообщения
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      
      // Добавляем новое сообщение
      const updatedMessages = [newMessage, ...existingMessages];
      
      // Сохраняем в localStorage
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

      toast.success('Ваше сообщение успешно отправлено!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-autoblue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Свяжитесь с нами</h1>
              <p className="text-xl text-gray-300">
                У вас есть вопросы? Мы всегда готовы помочь!
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Написать нам</h2>
                  
                  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Ваше имя
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Электронная почта
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Введите email"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Телефон
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Введите номер телефона"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Сообщение
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваше сообщение"
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-autoblue hover:bg-autoblue-light"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                    </Button>
                  </form>
                </div>
                
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-autogray rounded-full p-3 mr-4">
                          <MapPin className="text-autoblue h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                          <p className="text-gray-700">
                            ул. Автомобильная, 42<br />
                            Москва, Россия, 123456
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-autogray rounded-full p-3 mr-4">
                          <Phone className="text-autoblue h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                          <p className="text-gray-700">
                            <a href="tel:+71234567890" className="hover:text-autoblue">
                              +7 (123) 456-78-90
                            </a><br />
                            <a href="tel:+79876543210" className="hover:text-autoblue">
                              +7 (987) 654-32-10
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-autogray rounded-full p-3 mr-4">
                          <Mail className="text-autoblue h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Email</h3>
                          <p className="text-gray-700">
                            <a href="mailto:info@delinight.ru" className="hover:text-autoblue">
                              info@delinight.ru
                            </a><br />
                            <a href="mailto:support@delinight.ru" className="hover:text-autoblue">
                              support@delinight.ru
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-autogray rounded-full p-3 mr-4">
                          <Clock className="text-autoblue h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Часы работы</h3>
                          <p className="text-gray-700">
                            Пн-Пт: 9:00 - 20:00<br />
                            Сб-Вс: 10:00 - 18:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Карта */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-lg mb-4">Как нас найти</h3>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.123456789012!2d38.91234567890123!3d47.21234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3b9b47a7e7029%3A0x9e8cb546a10601c!2zMTAt0Y8g0L_RgNC-0YHQv9C10LrRgiwgMiwg0KLQsNCz0L3QvtCz0L7RgNC-0LQsINCg0L7RgdGB0LjRjywgMzQ3OTA0!5e0!3m2!1sru!2sru!4v1234567890!5m2!1sru!2sru"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
