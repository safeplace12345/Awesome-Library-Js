
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
const logInAndOut = (authorizer, database) => {
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

export const Auth = {
  loginUser,
  logOut,
  signUpNewUser,
  logInAndOut,
};
