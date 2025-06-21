// Register
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (name && email && password) {
      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert("Registration successful!");
      window.location.href = "login.html";
    }
  });
}

// Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userName", user.name);
        window.location.href = "welcome.html";
      } else {
        document.getElementById('loginError').innerText = "Incorrect password.";
      }
    } else {
      document.getElementById('loginError').innerText = "User not found.";
    }
  });
}

// Welcome Page
if (window.location.pathname.includes("welcome.html")) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userName = sessionStorage.getItem("userName");

  if (isLoggedIn === "true" && userName) {
    document.getElementById("welcomeMsg").innerText = `Welcome, ${userName}`;
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.clear();
    alert("Logged out successfully.");
    window.location.href = "login.html";
  });
}
