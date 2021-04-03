const appendBooks = (doc , booksContainer) => {
  let newBook = doc.data();
  const btn = document.createElement("button");
  btn.innerText = "Delete Book";
  btn.classList.add('btn')
  btn.classList.add('btn-lg')
  btn.classList.add('btn-danger')
  btn.classList.add('m-3')
  btn.addEventListener("click", (e) => {
    deleteBook(e);
  });
  const div = document.createElement("div");
  div.classList.add("col-sm-4");
  div.classList.add("col-book");
  div.setAttribute("id", doc.id);
  let html = `
            <div class="card">
                <img src="./dd64da585bc57cb05e5fd4d8ce873f57.png" alt="" class="img-fluid">
                <div class="card-header">
                    <h1 class="text-mute">${newBook.title}</h1>
                </div>
                <div class="card-body">
                    <h6>${newBook.author}</h6>
                    <p class="card-text">${newBook.status}</p>
                    </div>
                    </div>
                `;
  div.insertAdjacentHTML("afterbegin", html);
  div.insertAdjacentElement("beforeend", btn);
  booksContainer.appendChild(div);
};
export default appendBooks