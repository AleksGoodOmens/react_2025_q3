# CO2 Emissions Data Dashboard

**# CO2 Emissions Data Dashboard**

A React application for analyzing CO2 emissions data worldwide with a focus on performance and optimization.

## 📊 Functionality

### Core Features

- **Data Loading**: Retrieval of hierarchical CO2 emissions data (~100MB JSON)
- **Data Display**: List of countries with population and CO2 emissions information
- **Data Tables**: Detailed year-by-year information for each country
- **Modal Window**: Selection of additional columns for display
- **Filtering**: Search by country name, filtering by regions
- **Sorting**: By population and country name (ascending/descending)
- **Year Selection**: Display data for specific years with change animations

### Technical Requirements

- React Suspense for data loading
- Memoization using useMemo and useCallback
- Render optimization with React.memo
- Performance profiling with React Dev Tools

## 🚀 Installation and Setup

```bash
# Clone repository
git clone <repository-url>
cd co2-emissions-dashboard

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 🛠 Tech Stack

- **React 18** with Suspense and Concurrent Features
- **TypeScript** for type safety
- **Vite** for building
- **CSS Modules** / **Tailwind** for styling

## 📈 Performance

[Performance Report](./performance-report.md)

### Implemented Optimizations

1. **React.memo** for components
2. **useMemo** for memoizing filtered/sorted lists
3. **useCallback** for event handlers

## 🎯 Key Components

### DataLoader

Suspense component for data loading with fallback indicator

### CountryList

Displays country list with sorting and filtering capabilities

### DataTable

Yearly data table optimized with React.memo

### ColumnSelectorModal

Modal window for selecting display columns

### YearSelector

Year selector with highlight animations on changes

## 🔧 Configuration

Before running, ensure the data file is located at:
`public/data/co2-data.json`

Or specify the data path in environment variables:

```env
VITE_DATA_URL=/path/to/co2-data.json
```

React-приложение для анализа данных о выбросах CO2 по странам мира с акцентом на производительность и оптимизацию.

## 📊 Функциональность

### Основные возможности

- **Загрузка данных**: Получение иерархических данных о выбросах CO2 (~100MB JSON)
- **Отображение данных**: Список стран с информацией о населении и выбросах CO2
- **Таблицы данных**: Детальная информация по годам для каждой страны
- **Модальное окно**: Выбор дополнительных колонок для отображения
- **Фильтрация**: Поиск по названию страны, фильтрация по регионам
- **Сортировка**: По населению и названию страны (возрастание/убывание)
- **Выбор года**: Отображение данных за конкретный год с анимацией изменений

### Технические требования

- React Suspense для загрузки данных
- Мемоизация с помощью useMemo и useCallback
- Оптимизация перерисовок с React.memo
- Профилирование производительности React Dev Tools

## 🚀 Установка и запуск

```bash
# Клонирование репозитория
git clone <repository-url>
cd co2-emissions-dashboard

# Установка зависимостей
npm install

# Запуск в development режиме
npm run dev

# Сборка для production
npm run build

# Предпросмотр сборки
npm run preview
```

## 🛠 Технологический стек

- **React 18** с Suspense и Concurrent Features
- **TypeScript** для типизации
- **Vite** для сборки
- **CSS Modules** / **Tailwind** для стилизации

## 📈 Производительность

[report english](./perfomance-report.md)

### Использованные оптимизации

1. **React.memo** для компонентов
2. **useMemo** для мемоизации filtered/sorted списков
3. **useCallback** для обработчиков событий

## 🎯 Ключевые компоненты

### DataLoader

Компонент с Suspense для загрузки данных с fallback-индикатором

### CountryList

Отображает список стран с возможностью сортировки и фильтрации

### DataTable

Таблица с годовыми данными, оптимизированная с помощью React.memo

### ColumnSelectorModal

Модальное окно для выбора отображаемых колонок

### YearSelector

Селектор года с highlight-анимацией при изменениях

## 🔧 Настройка

Перед запуском убедитесь, что файл с данными находится в:
`public/data/co2-data.json`

Или укажите путь к данным в environment variables:

```env
VITE_DATA_URL=/path/to/co2-data.json
```
