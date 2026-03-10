var FullName = document.getElementById("FN");
var SignUpEmail = document.getElementById("SiUPEM");
var SignUpPass = document.getElementById("SiUPPASS");
var SignUpBtn = document.getElementById("SiUPBTN");
var MsgSiUp = document.getElementById("MsgSiUp"); // Correctly referenced
var MsgSiIn = document.getElementById("MsgSiIn"); // Added for Login visibility

var RegExpFullName = new RegExp(
  "^[A-Za-z\u0600-\u06FF]{2,}(?:\\s+[A-Za-z\u0600-\u06FF]{2,})+$",
);
var RegExpSignUpEmail = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
);

//=============================================================================================
//=======                               Sign Up Button                                   ======
//=============================================================================================
SignUpBtn.addEventListener("click", () => {
  var Pointer = false;

  // Validation
  if (!RegExpFullName.test(FullName.value.trim())) {
    FullName.style.border = "2px solid red";
    Pointer = true;
  } else {
    FullName.style.border = "2px solid #636363";
  }

  if (!RegExpSignUpEmail.test(SignUpEmail.value.trim())) {
    SignUpEmail.style.border = "2px solid red";
    Pointer = true;
  } else {
    SignUpEmail.style.border = "2px solid #636363";
  }

  if (SignUpPass.value.trim() == "") {
    SignUpPass.style.border = "2px solid red";
    Pointer = true;
  } else {
    SignUpPass.style.border = "2px solid #636363";
  }

  if (Pointer) return;

  // FIX: Proper way to handle the first-time null return from localStorage
  var usersData = localStorage.getItem("users");
  var usersFromStorage = usersData ? JSON.parse(usersData) : [];

  // Check for existing email
  for (var i = 0; i < usersFromStorage.length; i++) {
    if (usersFromStorage[i].email == SignUpEmail.value) {
      MsgSiUp.textContent = "Email already has an account";
      MsgSiUp.style.color = "red";
      SignUpEmail.style.border = "2px solid red";
      return;
    }
  }

  // Add new user
  var newUser = {
    name: FullName.value,
    email: SignUpEmail.value,
    password: SignUpPass.value,
    ImgSrc: "Imgaes/DefultImage.png", // Correct path from root index.html
    TasksAll: [],
    Courses: [],
  };

  usersFromStorage.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersFromStorage));

  // Success Feedback
  MsgSiUp.textContent = "Account created! Redirecting...";
  MsgSiUp.style.color = "rgb(0, 62, 63)";
  SignUpEmail.style.border = "2px solid #636363";

  // MOVE FORWARD: Redirect to dashboard with the new user's index
  setTimeout(() => {
    window.location.href = `pages/Dashboard.html?index=${usersFromStorage.length - 1}`;
  }, 1500);
});

//=============================================================================================
//=======                               Login Button                                     ======
//=============================================================================================
var EmailLogin = document.getElementById("EmailLogin");
var PassLogin = document.getElementById("PassLogin");
var BtnLogin = document.getElementById("BtnLogin");

BtnLogin.addEventListener("click", () => {
  var Found = false;
  var Index = 0;

  var usersData = localStorage.getItem("users");
  var usersFromStorage = usersData ? JSON.parse(usersData) : [];

  for (var i = 0; i < usersFromStorage.length; i++) {
    if (
      usersFromStorage[i].email == EmailLogin.value &&
      usersFromStorage[i].password == PassLogin.value
    ) {
      Index = i;
      Found = true;
      break;
    }
  }

  if (Found) {
    window.location.href = `pages/Dashboard.html?index=${Index}`;
  } else {
    MsgSiIn.textContent = "Incorrect login credentials";
    MsgSiIn.style.color = "red";
  }
});
