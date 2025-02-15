# User Authentication System (MEN Stack)

A **secure and minimalistic user authentication system** built using the **MEN Stack (MongoDB, Express.js, Node.js) with HTML, CSS, and JavaScript**.

## **🚀 Features**
- User **Signup & Login** with password hashing (bcrypt)
- **JWT Authentication** with session management
- **Protected Profile Page** (accessible only after login)
- **Logout Functionality** with token removal
- **Mocha & Chai Unit Tests** for authentication routes
- Fully **responsive** and **modern UI**

---

## **📂 Project Structure**
```
├───backend
   ├───config
        ├───db.js
   ├───controllers
        ├───authController.js
        ├───userController.js
   ├───middleware
        ├───authMiddleware.js
        ├───userMiddleware.js
   ├───models
        ├───User.js
   ├───routes
        ├───authRoutes.js
        ├───userRoutes.js
   ├───test
        ├───auth.test.js
   └───server.js
├───frontend
   ├───assets
        ├───homepage.JPG
   ├───css
        ├───styles.css
   ├───js
        ├───auth.js
        ├───main.js
   ├───index.html
   ├───login.html
   ├───logout.html
   ├───profile.html
   └───signup.html
├───package.json
└───package-lock.json

```


---

## **🛠 Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (Local or MongoDB Atlas)
- **npm** (Node Package Manager)
- **Postman** (for API testing)

---

## **🚀 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/User-Authentication-System.git
cd User-Authentication-System
```

### **2️⃣ Install Dependencies**
```sh
npm init
```

### **3️⃣ Run Server**
```sh
npm run dev
```

### **4️⃣ Launch the Application by visiting**
```sh
http://localhost:5000/
```

---

## 🛠 API Endpoints

| Method | Route               | Description                  | Protected |
|--------|---------------------|------------------------------|-----------|
| POST   | `/api/auth/signup`  | Register new user           | ❌ No  |
| POST   | `/api/auth/login`   | Authenticate user & get JWT | ❌ No  |
| GET    | `/api/user/profile` | Get user details            | ✅ Yes |
| POST   | `/api/auth/logout`  | Logout user & clear session | ✅ Yes |

📌 **Use Postman or Axios to test these API endpoints.**

---

### 🧪 Running Tests (Mocha & Chai)
```sh
npm test
```

---

## 📌 Author

**Neeraj Kumar**  
🚀 Full-Stack Developer | MERN Stack | Python | SQL  

🔗 [LinkedIn](https://www.linkedin.com/in/maineerajhu/) | 🌎 [Portfolio](https://neerajkumarcodes.github.io/Portfolio/)

