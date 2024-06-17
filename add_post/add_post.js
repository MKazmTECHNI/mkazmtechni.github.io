document
  .getElementById("addPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const errorDiv = document.getElementById("error");

    try {
      // Retrieve user data from localStorage
      const currentUserData = localStorage.getItem("currentUser");
      if (!currentUserData) {
        throw new Error("User not logged in");
      }

      const currentUser = JSON.parse(currentUserData);
      const creatorId = currentUser.id;

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator_id: creatorId,
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newPost = await response.json();
      console.log("Added new post:", newPost);

      // Redirect to the home page after successful post creation
      window.location.replace("http://127.0.0.1:3000/home.html");
    } catch (error) {
      console.error("Error adding post:", error);
      errorDiv.textContent = error.message;
    }
  });
