import React, { useState, useEffect } from "react";
import "./BookForm.css"; 

const BookForm = ({ addBook, updateBook, editingBook, setEditingBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setPublicationDate(editingBook.publication_date);
      setDescription(editingBook.description);
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      title,
      author,
      genre,
      publication_date: publicationDate,
      description,
    };

    if (editingBook) {
      updateBook(editingBook.id, book);
    } else {
      addBook(book);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="date"
        value={publicationDate || ""}
        onChange={(e) => setPublicationDate(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editingBook ? "Update" : "Add"}</button>
      {editingBook && (
        <button type="button" onClick={() => setEditingBook(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default BookForm;
