import { firebaseConfig } from "./firebaseConfig";
import { Auth } from "./auth";
import { Database } from "./database";
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
  let test = Array.from(colBooks).find((colbook) => colbook.contains(book));
  console.log(localStorage.getItem("myLibrary"));
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
});
const addBooksToDB = (database, user) => {
    DB.collection("Awesome-Library")
    .add({
        title: booksForm["title"].value,
        author: booksForm["author"].value,
        numOfPages: booksForm["numOfPages"].value,
        status: booksForm["status"].value,
    })
    .catch((err) => console.log(err));
};
DB.collection('Awesome-Library').onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        // appendBooks(doc.data());
        })
    })


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
const appendBooks = (newBook) => {
    booksContainer.innerHTML = ''
  let html = `<div class="col-sm-4 col-book">
            <div class="card">
                <img src="./dd64da585bc57cb05e5fd4d8ce873f57.png" alt="" class="img-fluid">
                <div class="card-header">
                    <h1 class="text-mute">${newBook.title}</h1>
                </div>
                <div class="card-body">
                    <h6>${newBook.author}</h6>
                    <p class="card-text">${newBook.status}</p>
                    <button class = "delete btn btn-danger" onclick = "deleteBook(this)"> Delete </button>
                </div>
            </div>
        </div>`;
  booksContainer.insertAdjacentHTML("beforeend", `${html}`);
};
