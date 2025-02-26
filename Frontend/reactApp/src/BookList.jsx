import React from "react";
import "./BookList.css"; 

const BookList = ({ books, setEditingBook, deleteBook }) => {
  return (
    <div className="book-list">
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <h3>Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Date: {new Date(book.publication_date).toLocaleDateString("en-GB")}</p>
            <p>Description: {book.description}</p>
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
