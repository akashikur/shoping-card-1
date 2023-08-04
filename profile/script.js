const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const emailId = document.getElementById("emailID");
const edit = document.getElementById("editAndSave");
const user = JSON.parse(localStorage.getItem("users"));
let currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
fName.value = currentUser.firstName;
lName.value = currentUser.lastName;

// password change
const oldpassword = document.getElementById("Oldpassword");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const changePass = document.getElementById("changePass");

// change the password if the old password is matched
changePass.addEventListener("click", (e) => {
  e.preventDefault();
  user.filter((e) => {
    e.email === currentUser.email;
    if (e.password === oldpassword.value) {
      if (password.value === confirmPassword.value) {
        e.password = password.value;
        const setval = JSON.stringify(user);
        localStorage.setItem("users", setval);
        location.href = "/login/index.html";
        console.log(user);
      } else {
        alert("password not the same");
        password.value = "";
        oldpassword.value = "";
        confirmPassword.value = "";
      }
    } else {
      alert("Password not matched");
      password.value = "";
      oldpassword.value = "";
      confirmPassword.value = "";
    }
  });
});
// clear the session when the logout button pressed
function logOut() {
  sessionStorage.removeItem("loggedInUser");
  location.href = "/index.html";
}
