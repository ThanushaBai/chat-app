# 🚀 Real-time Chat App (React Native + Node.js)

A full **real-time 1:1 chat application** built with **React Native (Expo)** frontend and **Node.js + Express + Socket.IO** backend. Messages are persisted in **MongoDB**.

---

## 📱 Features

### ✅ **MVP Complete**

* **Authentication**: JWT-based register/login
* **User List**: See all users and tap to start chat
* **Real-time Chat**: Live messaging via Socket.IO
* **Typing Indicators**: Shows when someone is typing
* **Read Receipts**: Message delivery & read status
* **Online Status**: See who is online

### 🎯 **Basic UI**

* Auth screens (register & login)
* Home (user list + last message preview)
* Chat (scrollable messages, input box, typing indicator)

---

## 🏗️ Project Structure

```
chat-app/
├── server/                 # Backend (Node.js + Express + Socket.IO)
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── lib/            # Socket.IO & DB utilities
│   │   └── seeds/          # Sample/test data
│   ├── package.json
│   └── .env
└── mobile/                  # React Native Frontend (Expo)
    ├── src/
    │   ├── screens/       # App screens (Home, Chat, Settings)
    │   ├── store/         # Zustand state management
    │   ├── components/    # Reusable UI components
    │   └── services/      # API & socket services
    ├── App.js
    └── package.json
```

---

## 🚀 Setup Instructions

### **Prerequisites**

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* Expo CLI: `npm install -g expo-cli`
* Mobile device or simulator

---

### **1. Server Setup**

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values:
# MONGO_URI=mongodb://localhost:27017/chat-app
# JWT_SECRET=your-jwt-secret
# PORT=5001

# Seed database with sample users
node src/seeds/user.seed.js

# Start server
npm run dev
```

---

### **2. Mobile Setup**

```bash
cd mobile

# Install dependencies
npm install

# Update server IP in store files
# src/store/useAuthStore.js
# src/store/useChatStore.js
# Replace 'http://192.168.1.100:5001' with your computer IP

# Start Expo
npx expo start

# Scan QR code using Expo Go (iOS/Android)
# OR run on emulator: npx expo run:android / npx expo run:ios
```

---

### **3. Network Configuration**

Replace the server IP in mobile store files:

```javascript
const BASE_URL = "http://YOUR_COMPUTER_IP:5001";
```

Find your IP:

* **Windows**: `ipconfig` → IPv4 address
* **Mac/Linux**: `ifconfig` → inet address

---

## 👥 Sample Users (Password: "123456")

* **Female Users:** [emma.thompson@example.com](mailto:emma.thompson@example.com), [olivia.miller@example.com](mailto:olivia.miller@example.com), [sophia.davis@example.com](mailto:sophia.davis@example.com)
* **Male Users:** [james.anderson@example.com](mailto:james.anderson@example.com), [william.clark@example.com](mailto:william.clark@example.com), [benjamin.taylor@example.com](mailto:benjamin.taylor@example.com)

---

## 📡 API Endpoints

### **Authentication**

* `POST /auth/register` → Register
* `POST /auth/login` → Login

### **Users**

* `GET /users` → Get all users

### **Conversations & Messages**

* `GET /conversations/:id/messages` → Get messages
* Socket.IO events:

  * `message:send` → Send new message
  * `message:new` → Receive message
  * `typing:start|stop`
  * `message:read`

---

## 🧪 Testing

* Login with multiple users on different devices
* Send & receive messages in real-time
* Typing indicator updates
* Online/offline status updates
* Messages persist in database

---

## 🔧 Environment Variables

### **Server (.env)**

```env
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-jwt-secret
PORT=5001
```

---

## 🚧 Future Enhancements

* Push notifications
* Voice messages
* Group chat
* Message search
* Dark mode theme

---

## 📄 License

MIT License

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/my-feature`)
5. Open pull request

---

**Built with ❤️ using React Native, Node.js, Socket.IO, and MongoDB**

