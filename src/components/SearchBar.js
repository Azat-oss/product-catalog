import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="🔍 Поиск по названию..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: { margin: "0 0 12px 0" },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "15px",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
};