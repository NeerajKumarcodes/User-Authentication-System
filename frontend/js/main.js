// 🔹 Function to Navigate to Different Pages
function navigateTo(page) {
    window.location.href = `/frontend/${page}`;
}

// 🔹 Function to Check if User is Logged In
function checkAuthStatus() {
    const token = localStorage.getItem("token");
    const profileButton = document.getElementById("profile-btn");

    if (token && profileButton) {
        profileButton.style.display = "block";
    }
}

// Run `checkAuthStatus` when the page loads
document.addEventListener("DOMContentLoaded", checkAuthStatus);
