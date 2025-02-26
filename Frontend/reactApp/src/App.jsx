import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import BookList from "./BookList";
import "./App.css"; 

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/book_details");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axios.post("http://localhost:8000/book_details", book);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:8000/book_details/${id}`, updatedBook);
      setBooks(books.map((book) => (book.id === id ? response.data : book)));
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/book_details/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="App">
      <h1>Book Catalog</h1>
      <BookForm
        addBook={addBook}
        updateBook={updateBook}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />
      <BookList books={books} setEditingBook={setEditingBook} deleteBook={deleteBook} />
    </div>
  );
};

export default App;
