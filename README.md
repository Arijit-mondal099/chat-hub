# 🚀 ChatHub

**ChatHub** is a real-time chat application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It enables seamless 1-on-1 messaging using Socket.IO, robust user authentication, and features a clean, modern, responsive UI.

---

## 🌐 Live Demo

👉 [Check out the live app here](https://your-live-demo-link.com)

---

## 🖼️ Screenshots

**Home Page**  
![Home](./frontend/public/screenshots/Home.png)

**Profile Page**  
![Home](./frontend/public/screenshots/profile.png)

---

## 📚 Tech Stack

**Frontend:**

- **React:** Builds a dynamic single-page application with reusable components and fast client-side routing.
- **Tailwind CSS:** Creates a responsive, modern UI using utility-first CSS classes.
- **DaisyUI:** Provides pre-designed Tailwind UI components for faster, consistent design.
- **Axios:** Makes HTTP requests to the backend API for authentication, profile updates, and messaging.

---

**Backend:**

- **Node.js:** Runs the server and handles asynchronous API requests.
- **Express.js:** Provides routing, middleware, and REST API endpoints for authentication, messaging, and file uploads.
- **Cloudinary:** Stores and serves user profile images securely in the cloud.
- **Multer:** Handles image uploads from the client and passes them to Cloudinary.
- **Mongoose:** Manages MongoDB models and schema validation for users, messages, and profiles.
- **Cookie-Parser:** Parses cookies for storing JWT tokens securely on the client.
- **Bcryptjs:** Hashes passwords for secure user authentication.

---

**Database:**

- **MongoDB:** Stores user accounts, chat messages, and profile data in a flexible NoSQL database.

---

**Realtime:**

- **Socket.IO & Socket.IO-Client:** Enables real-time 1-on-1 messaging and online user tracking.

---

**State Management:**

- **Zustand:** Manages global state (like auth status, user data, and online users) simply and efficiently.

---

**Authentication:**

- **JWT:** Provides secure token-based authentication and protects private routes.

---

## ✨ Features

✅ Realtime 1-on-1 messaging  
✅ User authentication (signup, login, logout)  
✅ Online users indicator
✅ User can update profile  
✅ Responsive design  
✅ Scroll to latest messages automatically  
✅ Protected routes

---

## ⚙️ Installation

1️⃣ **Clone the repository**

```bash
git clone https://github.com/your-username/ChatHub.git
cd ChatHub
```

2️⃣ **Install dependencies for frontend and backend**

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

```

3️⃣ **Add environment variables**

```bash
# Create a .env file in the backend directory and add:
PORT=4000
NODE_ENV=development
ORIGIN=http://localhost:5173
MONGODB_URI=add_your
JWT_SECRET=arijitmondal
CLOUDINARY_CLOUD_NAME=add_your
CLOUDINARY_API_KEY=add_your
CLOUDINARY_API_SECRET=add_your
```

4️⃣ **Run the application**

```bash
# In backend
npm run dev

# In frontend
npm run dev
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📬 Contact

Created by [Arijit Mondal](https://github.com/your-username) — feel free to reach out!
