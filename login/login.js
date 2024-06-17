const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    console.log("Logged in user:", userData);

    // Store user data in localStorage or sessionStorage for session management
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // Redirect or navigate to another page upon successful login
    window.location.replace("http://127.0.0.1:3000/home.html");
  } catch (error) {
    console.error("Login error:", error);
    loginError.textContent = "Invalid username or password. Please try again.";
  }
});
