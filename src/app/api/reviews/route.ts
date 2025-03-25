import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Путь к JSON файлу для хранения отзывов
const dataFilePath = path.join(process.cwd(), 'data', 'reviews.json');

// Интерфейс для отзывов
interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  date: string;
}

// Создаем директорию и файл, если они не существуют
const ensureFileExists = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(dataFilePath)) {
    // Инициализируем файл с несколькими тестовыми отзывами
    const initialReviews: Review[] = [
      {
        id: '1',
        name: 'Александр Петров',
        company: 'ООО "ТехноИнновации"',
        rating: 5,
        text: 'Олег разработал для нас корпоративный сайт в кратчайшие сроки. Отличная коммуникация и высокое качество кода. Рекомендую!',
        date: '15.06.2023'
      },
      {
        id: '2',
        name: 'Елена Сидорова',
        company: 'Маркетинговое агентство "Импульс"',
        rating: 5,
        text: 'Сотрудничество с Олегом было очень продуктивным. Он помог нам создать Telegram-бота для автоматизации работы с клиентами, что значительно упростило наши бизнес-процессы.',
        date: '23.09.2023'
      },
      {
        id: '3',
        name: 'Михаил Иванов',
        company: 'Интернет-магазин "ЭкоПродукт"',
        rating: 4,
        text: 'Олег помог нам реализовать интеграцию с платежной системой и улучшить архитектуру нашего веб-приложения. Только положительные впечатления от сотрудничества!',
        date: '07.11.2023'
      }
    ];
    fs.writeFileSync(dataFilePath, JSON.stringify(initialReviews, null, 2));
  }
};

// Функция для получения всех отзывов
const getReviews = (): Review[] => {
  ensureFileExists();
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data) as Review[];
};

// Функция для сохранения отзывов
const saveReviews = (reviews: Review[]) => {
  ensureFileExists();
  fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
};

// GET-обработчик для получения всех отзывов
export async function GET() {
  try {
    const reviews = getReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении отзывов' },
      { status: 500 }
    );
  }
}

// POST-обработчик для создания нового отзыва
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация данных
    if (!body.name || !body.text || !body.rating) {
      return NextResponse.json(
        { error: 'Имя, текст отзыва и рейтинг обязательны' },
        { status: 400 }
      );
    }
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: body.name,
      company: body.company || '',
      rating: body.rating,
      text: body.text,
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    const reviews = getReviews();
    reviews.unshift(newReview); // Добавляем в начало массива
    saveReviews(reviews);
    
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании отзыва:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании отзыва' },
      { status: 500 }
    );
  }
}

// DELETE-обработчик для удаления отзыва (можно использовать для модерации)
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID отзыва не указан' },
        { status: 400 }
      );
    }
    
    let reviews = getReviews();
    reviews = reviews.filter(review => review.id !== id);
    saveReviews(reviews);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении отзыва' },
      { status: 500 }
    );
  }
} 