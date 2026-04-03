import React from "react";
import ItemCard from "./ItemCard";

export default function ItemList({ items, selectedId, onSelect }) {
  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        😕 Совпадений не найдено. Попробуйте изменить запрос или фильтр.
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

const styles = {
  empty: {
    textAlign: "center",
    padding: "30px 20px",
    color: "#6b7280",
    fontSize: "15px",
  },
};