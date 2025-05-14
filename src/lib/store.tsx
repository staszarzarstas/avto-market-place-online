import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CartContextType } from './types';

// Sample products data with realistic images
const productsData: Product[] = [
  {
    id: 1,
    name: "Премиум чехлы для сидений",
    description: "Высококачественные чехлы для сидений из экокожи, обеспечивающие комфорт и защиту вашим сиденьям.",
    price: 5999,
    imageUrl: "https://basket-04.wbbasket.ru/vol436/part43622/43622971/images/big/1.webp",
    category: "Накидки и чехлы",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "LED фары дальнего света",
    description: "Яркие LED фары с улучшенной видимостью ночью и увеличенным сроком службы.",
    price: 4500,
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/12396668/2a00000194d632fb051016960d791807a164/orig",
    category: "Освещение",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Всесезонные резиновые коврики",
    description: "Прочные резиновые коврики для защиты пола вашего автомобиля от грязи и влаги.",
    price: 2499,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-8/c1000/6858918008.jpg",
    category: "Резиновые коврики",
    rating: 4.7,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Держатель для смартфона",
    description: "Универсальный магнитный держатель для смартфона с креплением на панель или воздуховод.",
    price: 990,
    imageUrl: "https://basket-12.wbbasket.ru/vol1752/part175207/175207911/images/big/1.webp",
    category: "Электроника",
    rating: 4.5,
    inStock: true
  },
  {
    id: 5,
    name: "Автомобильный компрессор",
    description: "Портативный компрессор для накачивания шин с цифровым дисплеем и автостопом.",
    price: 3299,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-o/c1000/6685124064.jpg",
    category: "Инструменты",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: "Автомобильный видеорегистратор",
    description: "Full HD регистратор с ночным режимом и широким углом обзора.",
    price: 4999,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1/c1000/6432965881.jpg",
    category: "Электроника",
    rating: 4.8,
    inStock: true
  },
  {
    id: 7,
    name: "Оплетка на руль",
    description: "Эргономичная оплетка из искусственной кожи для комфортного вождения.",
    price: 899,
    imageUrl: "https://basket-02.wbbasket.ru/vol229/part22970/22970875/images/big/1.webp",
    category: "Интерьер",
    rating: 4.3,
    inStock: true
  },
  {
    id: 8,
    name: "Защитная пленка для фар",
    description: "Прозрачная защитная пленка для фар от сколов и повреждений.",
    price: 1299,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-q/c1000/6818889662.jpg",
    category: "Экстерьер",
    rating: 4.4,
    inStock: true
  },
  {
    id: 9,
    name: "Ароматизатор воздуха",
    description: "Освежитель воздуха премиум-класса с долгоиграющим ароматом.",
    price: 499,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-7/c1000/7099824715.jpg",
    category: "Интерьер",
    rating: 4.2,
    inStock: true
  },
  {
    id: 10,
    name: "Алюминиевые накладки на педали",
    description: "Стильные накладки на педали из алюминиевого сплава для спортивного вида.",
    price: 1599,
    imageUrl: "https://basket-13.wbbasket.ru/vol1965/part196554/196554463/images/big/1.webp",
    category: "Тюнинг",
    rating: 4.6,
    inStock: true
  },
  {
    id: 11,
    name: "Защитные брызговики",
    description: "Комплект брызговиков для защиты кузова от грязи и камней.",
    price: 1899,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-6/c1000/7110301578.jpg",
    category: "Экстерьер",
    rating: 4.5,
    inStock: true
  },
  {
    id: 12,
    name: "Набор автомобильных инструментов",
    description: "Компактный набор необходимых инструментов для мелкого ремонта в дороге.",
    price: 2999,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-g/c1000/6367314676.jpg",
    category: "Инструменты",
    rating: 4.7,
    inStock: true
  },
  {
    id: 13,
    name: "Автомобильный пылесос",
    description: "Мощный компактный пылесос для уборки салона автомобиля.",
    price: 2499,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-p/c1000/6726778297.jpg",
    category: "Электроника",
    rating: 4.4,
    inStock: true,
    featured: true
  },
  {
    id: 14,
    name: "Солнцезащитные шторки",
    description: "Комплект солнцезащитных шторок для боковых окон автомобиля.",
    price: 1299,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-5/c1000/6337707365.jpg",
    category: "Интерьер",
    rating: 4.3,
    inStock: true
  },
  {
    id: 15,
    name: "Автомобильное зарядное устройство",
    description: "Быстрое зарядное устройство с несколькими USB-портами для автомобиля.",
    price: 1299,
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/5215925/2a000001958ab38320b68979c0db4ee9d692/orig",
    category: "Электроника",
    rating: 4.7,
    inStock: true
  },
  {
    id: 16,
    name: "Накладки на пороги с подсветкой",
    description: "Стильные накладки на пороги с LED-подсветкой для вашего автомобиля.",
    price: 3999,
    imageUrl: "https://basket-21.wbbasket.ru/vol3632/part363292/363292077/images/c516x688/1.webp",
    category: "Тюнинг",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: 17,
    name: "Автомобильный холодильник",
    description: "Портативный холодильник для хранения напитков и продуктов в дороге.",
    price: 7999,
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/4754204/2a00000190991c91f4ae32bd4b3ae4f260cd/orig",
    category: "Электроника",
    rating: 4.9,
    inStock: true
  },
  {
    id: 18,
    name: "Набор для полировки кузова",
    description: "Профессиональный набор для полировки и защиты лакокрасочного покрытия.",
    price: 3499,
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/12365257/2a0000019482d393c32c0c66b1ffd08b0c49/orig",
    category: "Уход за автомобилем",
    rating: 4.6,
    inStock: true
  },
  {
    id: 19,
    name: "Автомобильная сигнализация",
    description: "Современная охранная система с двусторонней связью и автозапуском.",
    price: 8999,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-x/c400/7267424109.jpg",
    category: "Безопасность",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 20,
    name: "Автомобильные шторки на присосках",
    description: "Универсальные шторки для защиты от солнца с быстрым креплением.",
    price: 999,
    imageUrl: "image.png",
    category: "Интерьер",
    rating: 4.2,
    inStock: true
  },
  {
    id: 21,
    name: "Камера заднего вида",
    description: "HD-камера с парковочными линиями для безопасного движения задним ходом.",
    price: 3999,
    imageUrl: "https://basket-02.wbbasket.ru/vol214/part21476/21476925/images/big/1.webp",
    category: "Электроника",
    rating: 4.8,
    inStock: true
  },
  {
    id: 22,
    name: "Декоративная подсветка салона",
    description: "RGB светодиодная подсветка с пультом управления для салона автомобиля.",
    price: 1999,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-n/c400/7233694907.jpg",
    category: "Тюнинг",
    rating: 4.5,
    inStock: true
  },
  // Новые товары
  {
    id: 23,
    name: "EVA коврики премиум-класса",
    description: "3D коврики из экологичного материала EVA с бортиками. Индивидуальный крой для вашей марки автомобиля.",
    price: 5499,
    imageUrl: "https://basket-12.wbbasket.ru/vol1804/part180487/180487927/images/big/1.webp",
    category: "EVA коврики",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 24,
    name: "Ворсовые коврики стандарт",
    description: "Классические ворсовые коврики с противоскользящим основанием и окантовкой.",
    price: 2990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-z/c1000/6984115163.jpg",
    category: "Ворсовые коврики",
    rating: 4.5,
    inStock: true
  },
  {
    id: 25,
    name: "Люксовые ворсовые коврики",
    description: "Премиальные ворсовые коврики повышенной плотности с водоотталкивающей пропиткой и кожаной окантовкой.",
    price: 4290,
    imageUrl: "https://autokovrik.ru/trumbsImages/6508c404ef3b1f7ff389303e63cbee73/Frame%2018_960x_0_75.png",
    category: "Ворсовые коврики",
    rating: 4.7,
    inStock: true,
    featured: true
  },
  {
    id: 26,
    name: "Универсальные EVA коврики",
    description: "Универсальные коврики из EVA материала с возможностью подрезки под размер салона.",
    price: 3990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-k/c1000/6387910244.jpg",
    category: "EVA коврики",
    rating: 4.4,
    inStock: true
  },
  {
    id: 27,
    name: "Кожаные накидки на сиденья",
    description: "Роскошные накидки из натуральной кожи с перфорацией для комфорта в любую погоду.",
    price: 12990,
    imageUrl: "https://basket-01.wbbasket.ru/vol133/part13317/13317421/images/big/1.webp",
    category: "Накидки и чехлы",
    rating: 4.9,
    inStock: true,
    featured: true
  },
  {
    id: 28,
    name: "Экокожа накидки комплект",
    description: "Полный комплект накидок из экологичной кожи для всех сидений автомобиля.",
    price: 7990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-1/c400/7443210601.jpg",
    category: "Накидки и чехлы",
    rating: 4.7,
    inStock: true
  },
  {
    id: 29,
    name: "Охлаждающие накидки на сиденья",
    description: "Летние накидки с активной вентиляцией для комфортной езды в жаркую погоду.",
    price: 5990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-y/c400/7489940434.jpg",
    category: "Накидки и чехлы",
    rating: 4.6,
    inStock: true
  },
  {
    id: 30,
    name: "Майки накидки на передние сиденья",
    description: "Легкие накидки-майки из эластичной ткани для защиты передних сидений.",
    price: 1990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-p/c1000/7027340641.jpg",
    category: "Накидки и чехлы",
    rating: 4.3,
    inStock: true
  },
  {
    id: 31,
    name: "3D коврики в багажник EVA",
    description: "Объемные коврики для багажника из EVA материала с высокими бортами для защиты от грязи и влаги.",
    price: 3990,
    imageUrl: "https://homato.ru/upload/resizer2/16/371/3716ff5a40b6ae4e8d27d89d372cab93.jpg",
    category: "EVA коврики",
    rating: 4.8,
    inStock: true
  },
  {
    id: 32,
    name: "Массажная накидка с подогревом",
    description: "Комфортная накидка с функциями массажа и подогрева для водительского сиденья.",
    price: 9990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-8/c1000/6846849764.jpg",
    category: "Накидки и чехлы",
    rating: 4.8,
    inStock: true
  },
  {
    id: 33,
    name: "Зимние чехлы для руля",
    description: "Теплые меховые чехлы для рулевого колеса в холодное время года.",
    price: 990,
    imageUrl: "https://basket-03.wbbasket.ru/vol414/part41434/41434835/images/big/1.webp",
    category: "Интерьер",
    rating: 4.2,
    inStock: true
  },
  {
    id: 34,
    name: "Резиновые коврики для грязной обуви",
    description: "Глубокие резиновые коврики повышенной прочности для эксплуатации в суровых условиях.",
    price: 2990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-h/c400/7060012073.jpg",
    category: "Резиновые коврики",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: 35,
    name: "Комбинированные EVA коврики",
    description: "Инновационные коврики с комбинацией EVA основы и текстильного покрытия для максимального комфорта.",
    price: 6990,
    imageUrl: "https://magnitogorsk.avto-v-trende.ru/image/cache/catalog/KOVRI/kovryisalonavelyur_1-800x800.jpg",
    category: "EVA коврики",
    rating: 4.9,
    inStock: true
  },
  {
    id: 36,
    name: "Детское автокресло",
    description: "Безопасное автокресло для детей с регулировкой наклона и высоты.",
    price: 11990,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-l/c1000/6867335289.jpg",
    category: "Безопасность",
    rating: 4.9,
    inStock: true,
    featured: true
  }
];

// Context for products
const ProductContext = createContext<{ products: Product[] }>({ products: [] });

// Context for cart
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0
});

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ProductContext.Provider value={{ products: productsData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update totals when items change
  useEffect(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Add item to cart
  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hooks to use the contexts
export const useProducts = () => useContext(ProductContext);
export const useCart = () => useContext(CartContext);
