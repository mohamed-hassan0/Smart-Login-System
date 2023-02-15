// sign up
var userName = document.getElementById("userNameInput");
var userEmail = document.getElementById("userEmailInput");
var passwordInput = document.getElementById("userPasswordInput");

var signUpBtn = document.getElementById("signUpBtn");

if (localStorage.getItem("usersInfo") === null) {
  localStorage.setItem("usersInfo", JSON.stringify([]));
}

var usersInfo = JSON.parse(localStorage.getItem("usersInfo"));
if ((signUpBtn != null) == true) {
  signUpBtn.addEventListener("click", function () {
    if (validateSignUpInputs() == true) {
      document.querySelector(".required").classList.replace("d-none", "d-block");
    } else {
      if (isEmailExist() == true) {
        document.querySelector(".required").classList.replace("d-none", "d-block");
        document.querySelector(".required").innerHTML = "this email is already exist write another one"
      } else {
        var userInfo = {
          name: userName.value,
          email: userEmail.value,
          password: passwordInput.value,
        };
        usersInfo.push(userInfo);
        clearSignUp();
        localStorage.setItem("usersInfo", JSON.stringify(usersInfo));
        document.querySelector(".required").classList.replace("d-block", "d-none");
        document.querySelector(".success").classList.replace("d-none", "d-block");
      }
    }
  });
}

function clearSignUp() {
  userName.value = "";
  userEmail.value = "";
  passwordInput.value = "";
}

function validateSignUpInputs() {
  if (
    userName.value == "" ||
    userEmail.value == "" || 
    passwordInput.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function isEmailExist() {
  for (var i = 0; i < usersInfo.length; i++) {
    if (userEmail.value == usersInfo[i].email) {
      return true;
    }
  }
}

// //login
var logInEmail = document.querySelector("#logInEmail");
var logInPassword = document.querySelector("#logInPassword");
var logInBtn = document.getElementById("logInBtn");
if ((logInBtn != null) == true) {
  logInBtn.addEventListener("click", function () {
    if (logInEmail.value == "" && logInPassword.value == "") {
      document.querySelector(".logInLost").classList.replace("d-none", "d-block");
    } else {
      if (isEmailExistLogin() != true) {
        document.querySelector(".notFound").classList.replace("d-none", "d-block");
        clearLogInInputs();
      } else {
        for (var i = 0; i < usersInfo.length; i++) {
          if (
            usersInfo[i].email == logInEmail.value &&
            usersInfo[i].password == logInPassword.value
          ) {
            localStorage.setItem("name", JSON.stringify(usersInfo[i].name));
            localStorage.setItem("index", JSON.stringify(i));
            clearLogInInputs();
            window.open("home.html")
          }
        }
      }
    }
  });
}
function isEmailExistLogin() {
  for (var i = 0; i < usersInfo.length; i++) {
    if (
      logInEmail.value == usersInfo[i].email &&
      logInPassword.value == usersInfo[i].password
    ) {
      return true;
    }
  }
}
function clearLogInInputs() {
  logInEmail.value = "";
  logInPassword.value = "";
}
// home page
var welcomingName = localStorage.getItem("name");
var userIndex = localStorage.getItem("index");
var logOut = document.querySelector("#logOut");
if ((logOut != null) == true) {
    document.querySelector(".home").innerHTML = `Welcome ${JSON.parse(
      welcomingName
    )}`;
  logOut.addEventListener("click", function () {
    usersInfo.splice(userIndex,1);
    localStorage.setItem("usersInfo", JSON.stringify(usersInfo))
    window.close();
  });
};
