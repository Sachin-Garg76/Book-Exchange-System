import React, { useEffect, useState } from "react";
import "./Styles/MyBooks.css";
import UserNavbar from "./userNav";

const MyBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchMyBooks();
    }, []);
    console.log("BOOK 👉", books);
    const fetchMyBooks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/books", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            // 👉 filter only logged-in user books
            const user = JSON.parse(localStorage.getItem("user"));

            const myBooks = data.filter(
                (book) => book.user && book.user._id === user._id
            );

            setBooks(myBooks);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <UserNavbar />

            <div className="mybooks-container">
                <h2>My <span>Books</span></h2>

                <div className="books-grid">
                    {books.length === 0 ? (
                        <p>No books uploaded yet 😢</p>
                    ) : (
                        books.map((book) => (
                            <div className="book-card" key={book._id}>

                                <img
                                    src={
                                        book.image
                                            ? `http://localhost:5000/uploads/${book.image}`
                                            : "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
                                    }
                                    alt="book"
                                    style={{ width: "100%", height: "200px", objectFit: "cover" }} // ✅ ADD THIS
                                    onError={(e) => {
                                        e.target.src = "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";
                                    }}
                                />
                                <h3>{book.bookName}</h3>
                                <p><b>Author:</b> {book.author}</p>
                                <p><b>Condition:</b> {book.condition}</p>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default MyBooks;