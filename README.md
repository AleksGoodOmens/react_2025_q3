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
