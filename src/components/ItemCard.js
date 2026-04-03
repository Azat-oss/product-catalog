import React from "react";

export default function ItemCard({ item, isSelected, onClick }) {
  const statusColor = item.status === "В наличии" ? "#16a34a" : "#dc2626";

  return (
    <div
      onClick={() => onClick(item)}
      style={{
        ...styles.card,
        borderColor: isSelected ? "#3b82f6" : "#e5e7eb",
        backgroundColor: isSelected ? "#eff6ff" : "#fff",
      }}
    >
      {/* Картинка товара */}
      <img
        src={item.image}
        alt={item.name}
        style={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/400x300/e5e7eb/6b7280?text=Нет+фото";
        }}
      />

      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.name}>{item.name}</span>
          <span style={{ ...styles.badge, color: statusColor }}>
            {item.status}
          </span>
        </div>
        <div style={styles.category}>📂 {item.category}</div>
        <div style={styles.price}>
          {item.price.toLocaleString("ru-RU")} ₽
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "10px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain", // Картинка вписывается целиком
    backgroundColor: "#f3f4f6", // Фон для пустых областей
    display: "block",
  },
  content: {
    padding: "12px 14px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  name: {
    fontWeight: 700,
    fontSize: "15px",
  },
  badge: {
    fontSize: "12px",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: "12px",
    backgroundColor: "#f0fdf4",
    border: "1px solid",
  },
  category: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "4px",
  },
  price: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#111827",
  },
};