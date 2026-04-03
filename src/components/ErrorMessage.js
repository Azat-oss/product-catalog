import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>⚠️</div>
      <p style={styles.text}>{message}</p>
      <button onClick={onRetry} style={styles.button}>
        Попробовать снова
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#fef2f2",
    borderRadius: "12px",
    border: "1px solid #fecaca",
  },
  icon: { fontSize: "36px", marginBottom: "10px" },
  text: { color: "#991b1b", fontSize: "15px", textAlign: "center", margin: "0 0 16px 0" },
  button: {
    padding: "8px 20px",
    fontSize: "14px",
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};