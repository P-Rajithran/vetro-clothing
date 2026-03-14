import React, { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(value)
        ? prev.sizes.filter((s) => s !== value)
        : [...prev.sizes, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "sizes") {
        data.append("sizes", JSON.stringify(val));
      } else {
        data.append(key, val);
      }
    });

    if (image1) data.append("image1", image1);
    if (image2) data.append("image2", image2);
    if (image3) data.append("image3", image3);
    if (image4) data.append("image4", image4);

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await axios.post(`${backendUrl}/api/product/add`, data, { headers });

      console.log("✅ Product added:", res.data);
      alert("Product added successfully!");
    } catch (err) {
      console.error("❌ Error adding product:", err.response?.data || err.message);
      alert("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="text" placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <input type="number" placeholder="Price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        <input type="text" placeholder="Category" onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        <input type="text" placeholder="Subcategory" onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })} />
        
        <label>
          Bestseller:
          <input type="checkbox" onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })} />
        </label>

        <div>
          Sizes:
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={formData.sizes.includes(size)}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
        </div>

        <div>
          <input type="file" onChange={(e) => setImage1(e.target.files[0])} />
          <input type="file" onChange={(e) => setImage2(e.target.files[0])} />
          <input type="file" onChange={(e) => setImage3(e.target.files[0])} />
          <input type="file" onChange={(e) => setImage4(e.target.files[0])} />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
