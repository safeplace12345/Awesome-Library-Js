import { firebaseConfig } from "./firebaseConfig";
import { Auth } from "./auth";
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const DB = firebase.firestore();

const signInBtn = document.querySelector(".signin-btn");
const logoutBtn = document.querySelector(".logout-btn");
const logInBtn = document.querySelector(".login-btn");
signInBtn.addEventListener("click", () => {
  Auth.signUpNewUser(auth);
});

logInBtn.addEventListener("click", () => {
  Auth.loginUser(auth);
});
logoutBtn.addEventListener("click", () => {
  Auth.logOut(auth);
});

Auth.logInAndOut(auth, DB);

let myLibrary = [];
let title, status, author, add, numOfPages, booksContainer, addBooksNow;
addBooksNow = document.querySelector(".addbooks");
title = document.querySelector("#title");
author = document.querySelector("#author");
status = document.querySelector("#status");
add = document.querySelector("#btn");
numOfPages = document.querySelector("#numOfPages");
booksContainer = document.querySelector("#books");
addBooksNow.addEventListener("click", function () {
  return (document.querySelector(".addbookform").style.display = "block");
});
const deletebtns = document.querySelectorAll(".delete");
deletebtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    deleteBook(deleteBtn);
  });
});

function deleteBook(book) {
  let colBooks = document.querySelectorAll(".col-book");
  let test = Array.from(colBooks).find((colbook) =>
    colbook.contains(book.target)
  );
  console.log(test);
  DB.collection("Awesome-Library").doc(test.id).delete();
  return booksContainer.removeChild(test);
}
const booksForm = document.querySelector("#books-form");
booksForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newBook = new makeBook(
    title.value,
    author.value,
    numOfPages.value,
    status.value
  );
  DB.collection("Awesome-Library")
    .add({
      title: booksForm["title"].value,
      author: booksForm["author"].value,
      numOfPages: booksForm["numOfPages"].value,
      status: booksForm["status"].value,
    })
    .catch((err) => console.log(err));
});

DB.collection("Awesome-Library").onSnapshot((snapshot) => {
  snapshot.docs.forEach((doc) => {
    appendBooks(doc);
  });
});

function makeBook(tit, aut, nOp, status) {
  (this.title = tit), (this.author = aut), (this.numOfPages = nOp);
  this.info = `The ${this.title} by ${this.author} , ${
    this.numOfPages
  } pages, ${this.read()} `;
}
makeBook.prototype.read = function (e) {
  if (!status) {
    return "and not read yet !";
  }
  return "and read !!";
};
const appendBooks = (doc) => {
  let newBook = doc.data();
  const btn = document.createElement("button");
  btn.innerText = "Delete";
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
const dltbutton = document.querySelectorAll(".delete");
dltbutton.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    deleteBook(e);
  })
);
