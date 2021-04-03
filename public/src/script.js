import { firebaseConfig } from "./firebaseConfig";
import { Auth } from "./auth";
firebase.initializeApp(firebaseConfig);
import deleteBook from './DeleteBook'
import appendBooks from './appendBoooks'
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
    deleteBook(deleteBtn,booksContainer,DB);
  });
});

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
    appendBooks(doc , booksContainer);
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

const dltbutton = document.querySelectorAll(".delete");
dltbutton.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    deleteBook(e);
  })
);
