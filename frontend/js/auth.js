const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend API Base URL
const API_USER_URL = "http://localhost:5000/api/user"; // Backend User route URL

// Load Profile
async function loadProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to be logged in to view profile.");
        window.location.href = "login.html";
    }

    try {
        const response = await axios.get(`${API_USER_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = response.data;
        document.getElementById("user-name").innerText = user.name;
        document.getElementById("user-email").innerText = user.email;
        console.log(`User: ${JSON.stringify(user)}`);
    } catch (error) {
        alert(error.response?.data?.message || "Failed to load profile. Please try again.");
        console.log(error);
    }
}

// 🔹 Handle User Signup
async function signUp(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, {
            name,
            email,
            password
        });

        window.location.href = "login.html";
    } catch (error) {
        alert(error.response?.data?.message || "Signup failed. Please try again.");
        console.log(error);
    }
}

// 🔹 Handle User Login
async function logIn(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

        // Store JWT in localStorage
        localStorage.setItem("token", response.data.token);
        window.location.href = "profile.html";
    } catch (error) {
        alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
}

// 🔹 Handle Logout
function logOut() {
    localStorage.removeItem("token");
    window.location.href = "logout.html";
}
