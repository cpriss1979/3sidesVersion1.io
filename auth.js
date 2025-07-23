// Basic localStorage-based auth system

document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Register
  if (regForm) {
    regForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(user => user.username === username)) {
        alert("Username already exists");
        return;
      }

      users.push({ username, password, role: "free" });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created. You can now log in.");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        alert("Invalid login");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Welcome back, " + username + "!");
      window.location.href = "index.html";
    });
  }
});

// Utility
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}


function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}