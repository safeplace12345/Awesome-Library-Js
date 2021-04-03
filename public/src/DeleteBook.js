const deleteBook = (book, booksContainer, database) => {
  let colBooks = document.querySelectorAll(".col-book");
  let test = Array.from(colBooks).find((colbook) =>
    colbook.contains(book.target)
  );
  database.collection("Awesome-Library").doc(test.id).delete();
  return booksContainer.removeChild(test);
};

export default deleteBook;
