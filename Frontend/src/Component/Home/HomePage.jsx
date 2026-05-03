import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageNavbar from "../Navbar/LandingpageNav";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [requested, setRequested] = useState([]);
  const [search, setSearch] = useState("");

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const navigate = useNavigate();
  const booksRef = useRef(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books");
      const data = await res.json();

      if (res.ok) {
        setBooks(data.books || data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 Filter books
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // ❤️ Wishlist toggle
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

  // 🔹 Request Exchange
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
          "Authorization": token
        },
        body: JSON.stringify({ bookId }),
      });

      if (res.ok) {
        setRequested((prev) => [...prev, bookId]); // ✅ safe
      }
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToBooks = () => {
    booksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LandingPageNavbar />

      {/* HERO */}
      <div style={styles.hero}>
        <h1>Exchange Books Easily 📚</h1>
        <p>Find and exchange books with others</p>

        <div style={styles.heroButtons}>
          <button style={styles.btn} onClick={scrollToBooks}>
            Browse Books
          </button>

          <button
            style={styles.btnOutline}
            onClick={() => navigate("/login")}
          >
            Add Book
          </button>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* BOOKS */}
      <section style={styles.section} ref={booksRef}>
        <h2>All Books ({filteredBooks.length}) 📚</h2>

        <div style={styles.grid}>
          {filteredBooks.length === 0 ? (
            <p>No books found</p>
          ) : (
            filteredBooks.map((book) => {
              const isRequested = requested.includes(book._id);
              const isWishlisted = wishlist.includes(book._id);

              return (
                <div key={book._id} style={styles.card}>

                  {/* ❤️ LIKE */}
                  <span
                    style={styles.heart}
                    onClick={() => toggleWishlist(book._id)}
                  >
                    {isWishlisted ? "❤️" : "🤍"}
                  </span>

                  <img
                    src={
                      book.image
                        ? `http://localhost:5000/uploads/${book.image}`
                        : "/no-image.png" // ✅ LOCAL IMAGE
                    }
                    alt={book.bookName}
                    style={styles.bookImage}
                  />

                  <h3>{book.bookName}</h3>
                  <p>{book.author}</p>

                  <span style={styles.badge}>{book.condition}</span>

                  <button
                    style={isRequested ? styles.disabledBtn : styles.btn}
                    onClick={() => handleRequest(book._id)}
                    disabled={isRequested}
                  >
                    {isRequested
                      ? "Requested"
                      : "Request Exchange"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Start exchanging books today 📚</h2>
        <button
          style={styles.btn}
          onClick={() => navigate("/login")}
        >
          Add Book
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2026 Book Exchange</p>
      </footer>
    </>
  );
}

const styles = {
  hero: {
    textAlign: "center",
    padding: "60px",
    background: "#f5f5f5",
  },

  heroButtons: {
    marginTop: "20px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  input: {
    width: "300px",
    padding: "10px",
  },

  section: {
    padding: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    position: "relative",
  },

  heart: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px",
  },

  bookImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
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
  },

  btnOutline: {
    padding: "10px 20px",
    margin: "5px",
    border: "1px solid #e53935",
    color: "#e53935",
    background: "transparent",
  },

  cta: {
    textAlign: "center",
    padding: "50px",
    background: "#222",
    color: "#fff",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#111",
    color: "#fff",
  },
};