(function () {
  'use strict';

  const firebaseConfig = {
    apiKey: "AIzaSyCbQ2QN1wEB-Thf0tzon_ocip8GlKXUTJ8",
    authDomain: "oauth-f6aca.firebaseapp.com",
    projectId: "oauth-f6aca",
    storageBucket: "oauth-f6aca.appspot.com",
    messagingSenderId: "246703039292",
    appId: "1:246703039292:web:c5ed49306f61a76aa7b439",
  };

  const loginUser = (fn) => {
    const form = document.querySelector(".login-form");
    const email = form["email"].value;
    const pwd = form["pwd"].value;
    fn.signInWithEmailAndPassword(email, pwd).then((cred) => {
      return cred.user;
    });
  };
  const logOut = (fn) => {
    fn.signOut().then(() => {
      console.log("User left......");
    });
  };
  const signUpNewUser = (fn) => {
    const signInform = document.querySelector(".signin-form");
    const email = signInform["email"].value;
    const password = signInform["pwd"].value;
    fn.createUserWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred);
    });
  };
  const logInAndOut = (authorizer,database) => {
    const loginLinks = document.querySelectorAll(".login");
    const logOutLinks = document.querySelectorAll(".logout");
    authorizer.onAuthStateChanged((user) => {
      if (user) {
        loginLinks.forEach((link) => (link.style.display = "none"));
        logOutLinks.forEach((link) => (link.style.display = "block"));

      } else {
        loginLinks.forEach((link) => (link.style.display = "block"));
        logOutLinks.forEach((link) => (link.style.display = "none"));
      }
    });
  };

  const Auth = {
      loginUser,
      logOut,
      signUpNewUser,
      logInAndOut
  };

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
  let title, status, author, numOfPages, booksContainer, addBooksNow;
  addBooksNow = document.querySelector(".addbooks");
  title = document.querySelector("#title");
  author = document.querySelector("#author");
  status = document.querySelector("#status");
  document.querySelector("#btn");
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
    new makeBook(
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
    booksContainer.innerHTML = ''
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

}());
