import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./userNav";

export default function UserHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [requested, setRequested] = useState([]);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔹 FETCH BOOKS
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/books");
      const data = await res.json();

      console.log("BOOKS 👉", data); // 🔍 DEBUG

      if (res.ok) {
        setBooks(data.books || data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 REQUEST BOOK
  const handleRequest = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login required!");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/exchange/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();
      console.log("REQUEST RESPONSE 👉", data);

      if (res.ok) {
        setRequested((prev) => [...prev, bookId]);
      } else {
        alert(data.msg || "Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ❤️ Wishlist
  const toggleWishlist = (id) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((w) => w !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // 🔍 FILTER (🔥 FINAL FIX)
  const filteredBooks = books
    

  // 🔝 SORT
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sort === "az") {
      return a.bookName.localeCompare(b.bookName);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      <UserNavbar />

      <div style={styles.container}>
        <h1>Welcome {user?.name} 👋</h1>

        {/* 🔍 SEARCH + SORT */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        <h2 style={{ marginTop: "20px" }}>
          Available Books ({sortedBooks.length}) 📚
        </h2>

        {/* 📚 BOOK LIST */}
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div style={styles.grid}>
            {sortedBooks.length === 0 ? (
              <p>No books found</p>
            ) : (
              sortedBooks.map((book) => {
                const isRequested = requested.includes(book._id);
                const isWishlisted = wishlist.includes(book._id);

                return (
                  <div key={book._id} style={styles.card}>
                    
                    {/* ❤️ Wishlist */}
                    <span
                      style={styles.heart}
                      onClick={() => toggleWishlist(book._id)}
                    >
                      {isWishlisted ? "❤️" : "🤍"}
                    </span>

                    {/* 🖼️ IMAGE */}
                    <img
                      src={
                        book.image
                          ? `http://localhost:5000/uploads/${book.image}`
                          : "/no-image.png"
                      }
                      onError={(e) => (e.target.src = "/no-image.png")}
                      alt={book.bookName}
                      style={styles.bookImage}
                    />

                    <h3>{book.bookName}</h3>
                    <p>{book.author}</p>

                    <span style={styles.badge}>{book.condition}</span>

                    {/* 🔥 EXCHANGE */}
                    <button
                      style={isRequested ? styles.disabledBtn : styles.btn}
                      onClick={() => handleRequest(book._id)}
                      disabled={isRequested}
                    >
                      {isRequested ? "Requested ✅" : "Exchange"}
                    </button>

                    {/* 👁 VIEW */}
                    <button
                      style={styles.viewBtn}
                      onClick={() => setSelectedBook(book)}
                    >
                      View
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedBook && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{selectedBook.bookName}</h2>
            <p><b>Author:</b> {selectedBook.author}</p>
            <p><b>Condition:</b> {selectedBook.condition}</p>

            <img
              src={`http://localhost:5000/uploads/${selectedBook.image}`}
              style={styles.modalImg}
            />

            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

// 🎨 STYLES
const styles = {
  container: { padding: "20px" },

  controls: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    padding: "15px",
    borderRadius: "12px",
    background: "#fff",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  bookImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  badge: {
    margin: "10px 0",
    padding: "5px 10px",
    background: "#eee",
    borderRadius: "5px",
  },

  btn: {
    padding: "10px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  disabledBtn: {
    padding: "10px",
    background: "gray",
    color: "#fff",
    border: "none",
  },

  viewBtn: {
    marginTop: "5px",
    padding: "6px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  heart: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    cursor: "pointer",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },

  modalImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginTop: "10px",
  },
};