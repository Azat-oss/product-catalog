import React from "react";

export default function FilterBar({
  categoryValue,
  onCategoryChange,
  statusValue,
  onStatusChange,
  categories,
  onReset, // ← новый проп для сброса
}) {
  const statuses = ["В наличии", "Нет в наличии"];

  return (
    <div style={styles.container}>
      <div style={styles.filterGroup}>
        <label style={styles.label}>Категория:</label>
        <select
          value={categoryValue}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={styles.select}
        >
          <option value="">— Все категории —</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Статус:</label>
        <select
          value={statusValue}
          onChange={(e) => onStatusChange(e.target.value)}
          style={styles.select}
        >
          <option value="">— Любой статус —</option>
          {statuses.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Кнопка сброса */}
      <button type="button" onClick={onReset} style={styles.resetButton}>
        🔄 Сбросить
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: "1",
    minWidth: "180px",
  },
  label: { 
    fontSize: "13px", 
    fontWeight: 600, 
    color: "#374151" 
  },
  select: {
    padding: "8px 10px",
    fontSize: "14px",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  resetButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#6b7280",
    backgroundColor: "#f3f4f6",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    minHeight: "40px",
  },
};