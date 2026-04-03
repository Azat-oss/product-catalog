import React from "react";

export default function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Загрузка данных…</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 0",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "5px solid #e5e7eb",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: { marginTop: "14px", color: "#6b7280", fontSize: "15px" },
};