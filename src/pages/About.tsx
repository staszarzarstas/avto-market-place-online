import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-autoblue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">О компании DeliNight</h1>
              <p className="text-xl text-gray-300">
                Лидер на рынке автомобильных аксессуаров и комплектующих с 2010 года
              </p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Наша история</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                <p className="text-lg mb-6">
                  Компания <strong>DeliNight</strong> была основана в 2010 году группой энтузиастов автомобильного дела, 
                  объединенных общей идеей — предложить автовладельцам качественные аксессуары по доступным ценам.
                </p>
                
                <p className="text-lg mb-6">
                  Начав с небольшого магазина в Москве, мы быстро завоевали доверие клиентов благодаря нашему подходу к выбору 
                  товаров и высокому уровню обслуживания. Сегодня <strong>DeliNight</strong> — это сеть магазинов по всей России 
                  и один из крупнейших онлайн-магазинов автомобильных аксессуаров в стране.
                </p>
                
                <p className="text-lg">
                  Мы сотрудничаем напрямую с производителями и официальными дистрибьюторами, что позволяет нам 
                  предлагать нашим клиентам только оригинальные товары с гарантией качества по конкурентоспособным ценам.
                </p>
              </div>

              {/* Карта */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Наш адрес</h3>
                <p className="text-lg mb-6 text-center">
                  10-й пер., 2, Таганрог, Ростовская обл., 347904
                </p>
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
              
              <h2 className="text-3xl font-bold mb-8 text-center">Наши преимущества</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-16 h-16 rounded-full bg-autoblue flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center md:text-left">Широкий ассортимент</h3>
                  <p className="text-gray-700">
                    Более 10,000 наименований товаров от ведущих производителей. У нас вы найдете все, 
                    что нужно для вашего автомобиля — от аксессуаров для салона до инструментов.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-16 h-16 rounded-full bg-autoblue flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center md:text-left">Гарантия качества</h3>
                  <p className="text-gray-700">
                    Все товары проходят строгий контроль качества. Мы даем гарантию на всю продукцию и 
                    обеспечиваем полную техническую поддержку нашим клиентам.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-16 h-16 rounded-full bg-autoblue flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center md:text-left">Быстрая доставка</h3>
                  <p className="text-gray-700">
                    Доставляем товары по всей России в кратчайшие сроки. Собственная курьерская служба 
                    в крупных городах и надежные партнеры по логистике.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-16 h-16 rounded-full bg-autoblue flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center md:text-left">Профессиональная команда</h3>
                  <p className="text-gray-700">
                    Наши специалисты всегда готовы помочь с выбором товаров, предоставить консультацию 
                    и решить любые вопросы, связанные с покупкой и эксплуатацией.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button asChild className="bg-autoblue hover:bg-autoblue-light">
                  <Link to="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
