import React, { useState } from "react";
import "../../Styles/AddBook.css";
import UserNavbar from "./userNav";

function AddBook() {

  const [form, setForm] = useState({
    bookName: "",
    category: "",
    author: "",
    condition: "",
    image: null,   // ✅ file ke liye null
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // ✅ file handle
      setForm({
        ...form,
        image: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bookName || !form.author) {
      alert("Book name and author required ❗");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❗");
        return;
      }

      // ✅ FormData use karo
      const formData = new FormData();
      formData.append("bookName", form.bookName);
      formData.append("category", form.category);
      formData.append("author", form.author);
      formData.append("condition", form.condition);
      formData.append("description", form.description);
      formData.append("image", form.image); // 👈 file

      const res = await fetch("http://localhost:5000/api/books/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // ❗ Content-Type mat do
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Book Uploaded Successfully ✅");

        setForm({
          bookName: "",
          category: "",
          author: "",
          condition: "",
          image: null,
          description: ""
        });

      } else {
        alert(data.message || "Upload Failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="addbook-container">
        <div className="addbook-card">

          <h2>Upload <span>Book</span></h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Book Name</label>
              <input
                type="text"
                name="bookName"
                placeholder="Enter Book Name"
                value={form.bookName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Romantic"
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <input
                type="text"
                name="author"
                placeholder="Enter Author Name"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Condition</label>
              <input
                type="text"
                name="condition"
                placeholder="A+"
                value={form.condition}
                onChange={handleChange}
              />
            </div>

            {/* ✅ FILE INPUT */}
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter description..."
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              {loading ? "Uploading..." : "Upload Book"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;