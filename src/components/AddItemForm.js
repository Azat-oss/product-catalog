import React, { useState } from "react";

const initialFormState = {
  name: "",
  description: "",
  category: "",
  status: "В наличии",
  price: "",
  rating: "",
  image: "", // ← новое поле
};

export default function AddItemForm({ onAdd, categories }) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Название обязательно";
    if (!form.description.trim()) newErrors.description = "Описание обязательно";
    if (!form.category) newErrors.category = "Выберите категорию";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Укажите корректную цену";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newItem = {
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      price: Number(form.price),
      rating: Number(form.rating) || 0,
      // Если URL не указан, ставим заглушку
      image: form.image.trim() || "https://placehold.co/400x300/e5e7eb/6b7280?text=Нет+фото",
    };

    onAdd(newItem);
    setForm(initialFormState);
    setErrors({});
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    border: `2px solid ${errors[field] ? "#f87171" : "#d1d5db"}`,
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
  });

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>➕ Добавить товар</h3>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Название *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle("name")}
            placeholder="Введите название"
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Категория *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle("category")}
          >
            <option value="">— Выберите —</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span style={styles.error}>{errors.category}</span>}
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Описание *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ ...inputStyle("description"), minHeight: "60px", resize: "vertical" }}
            placeholder="Краткое описание товара"
          />
          {errors.description && <span style={styles.error}>{errors.description}</span>}
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Цена (₽) *</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            style={inputStyle("price")}
            placeholder="0"
            min="0"
          />
          {errors.price && <span style={styles.error}>{errors.price}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Статус</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={inputStyle("status")}
          >
            <option>В наличии</option>
            <option>Нет в наличии</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Рейтинг</label>
          <input
            name="rating"
            type="number"
            value={form.rating}
            onChange={handleChange}
            style={inputStyle("rating")}
            placeholder="0–5"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
      </div>

      {/* ← Поле для URL картинки */}
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>URL картинки</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            style={inputStyle("image")}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <button type="submit" style={styles.button}>
        Добавить
      </button>
    </form>
  );
}

const styles = {
  form: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #bbf7d0",
  },
  heading: { margin: "0 0 16px 0", fontSize: "17px", color: "#166534" },
  row: { display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" },
  field: { flex: "1", minWidth: "180px" },
  label: { display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px", color: "#374151" },
  error: { display: "block", fontSize: "12px", color: "#dc2626", marginTop: "4px" },
  button: {
    padding: "10px 28px",
    fontSize: "15px",
    fontWeight: 700,
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "4px",
  },
};