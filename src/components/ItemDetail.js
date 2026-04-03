import React from "react";

export default function ItemDetail({ item }) {
  if (!item) {
    return (
      <div style={styles.placeholder}>
        <div style={styles.icon}>📋</div>
        <p>Выберите элемент из списка, чтобы увидеть подробную информацию.</p>
      </div>
    );
  }

  const statusColor = item.status === "В наличии" ? "#16a34a" : "#dc2626";

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{item.name}</h3>

      <table style={styles.table}>
        <tbody>
          <tr>
            <th style={styles.th}>ID</th>
            <td style={styles.td}>{item.id}</td>
          </tr>
          <tr>
            <th style={styles.th}>Категория</th>
            <td style={styles.td}>{item.category}</td>
          </tr>
          <tr>
            <th style={styles.th}>Статус</th>
            <td style={{ ...styles.td, color: statusColor, fontWeight: 700 }}>
              {item.status}
            </td>
          </tr>
          <tr>
            <th style={styles.th}>Цена</th>
            <td style={styles.td}>
              {item.price.toLocaleString("ru-RU")} ₽
            </td>
          </tr>
          <tr>
            <th style={styles.th}>Рейтинг</th>
            <td style={styles.td}>⭐ {item.rating} / 5.0</td>
          </tr>
          <tr>
            <th style={styles.th}>Описание</th>
            <td style={styles.td}>{item.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    color: "#9ca3af",
    textAlign: "center",
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
  },
  icon: { fontSize: "48px", marginBottom: "12px" },
  title: { margin: "0 0 16px 0", fontSize: "20px", color: "#111827" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    borderBottom: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: 600,
    width: "120px",
  },
  td: {
    padding: "8px 12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  },
};