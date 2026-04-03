import React, { useState, useEffect, useMemo } from "react";
import { initialProducts } from "./data/products";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetail";
import AddItemForm from "./components/AddItemForm";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  // --- Состояния ---
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  
  // Состояния фильтров
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); 

  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Загрузка данных ---
  const fetchData = () => {
  setLoading(true);
  setError(null);
  
  setTimeout(() => {
    // Имитируем случайную ошибку (с вероятностью 40%)
    const shouldFail = Math.random() < 0.4; 

    if (shouldFail) {
      setError("Ошибка соединения с сервером. Попробуйте позже.");
      setLoading(false);
    } else {
      try {
        setItems(initialProducts);
        setLoading(false);
      } catch (e) {
        setError("Неизвестная ошибка при парсинге данных.");
        setLoading(false);
      }
    }
  }, 1200);
};

  useEffect(() => {
    fetchData();
  }, []);

  // --- Вычисление уникальных категорий ---
  const categories = useMemo(
    () => [...new Set(initialProducts.map((p) => p.category))],
    []
  );

  // --- Логика фильтрации (Поиск + Категория + Статус) ---
  const filteredItems = useMemo(() => {
    const query = search.toLowerCase().trim();
    
    return items.filter((item) => {
      // 1. Проверка поиска
      const matchesSearch = !query || item.name.toLowerCase().includes(query);
      
      // 2. Проверка категории
      const matchesCategory = !filterCategory || item.category === filterCategory;
      
      // 3. Проверка статуса 
      const matchesStatus = !filterStatus || item.status === filterStatus;

      // Возвращаем true только если ВСЕ условия выполнены
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, search, filterCategory, filterStatus]);

  // --- Добавление товара ---
  const handleAddItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

    const handleResetFilters = () => {
    setFilterCategory("");
    setFilterStatus("");
   
  };

  // --- Рендер ---
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>🛒 Каталог товаров</h1>
      </header>

      <main style={styles.main}>
        {/* Левая колонка: Управление и список */}
        <section style={styles.leftCol}>
          
          <SearchBar value={search} onChange={setSearch} />
          
          {/* Передаем оба фильтра и их обработчики */}
          <FilterBar 
            categoryValue={filterCategory}
            onCategoryChange={setFilterCategory}
            statusValue={filterStatus}       // <--- ПЕРЕДАЧА ЗНАЧЕНИЯ
            onStatusChange={setFilterStatus} // <--- ПЕРЕДАЧА ОБРАБОТЧИКА
            categories={categories}
            onReset={handleResetFilters} 
          />

          <ItemList
            items={filteredItems}
            selectedId={selectedItem?.id}
            onSelect={setSelectedItem}
          />

          <AddItemForm onAdd={handleAddItem} categories={categories} />
        </section>

        {/* Правая колонка: Детали */}
        <aside style={styles.rightCol}>
          <ItemDetail item={selectedItem} />
        </aside>
      </main>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px 16px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: { textAlign: "center", marginBottom: "24px" },
  title: { fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 },
  main: { 
    display: "flex", 
    gap: "24px", 
    alignItems: "flex-start",
    flexDirection: "row" 
  },
  leftCol: { flex: "1.3", minWidth: "0" },
  rightCol: { flex: "1", position: "sticky", top: "24px", minWidth: "0" },
};