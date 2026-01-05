# MERN Chat App 💬

A modern, real-time chat application built with the MERN stack featuring instant messaging, user authentication, and a sleek UI.

## ✨ Features

- **Real-time Messaging** - Instant message delivery using Socket.IO
- **User Authentication** - Secure JWT-based auth with bcrypt password hashing
- **Media Sharing** - Upload and share images via Cloudinary
- **Modern UI** - Beautiful, responsive interface with dark mode support
- **Emoji Support** - Express yourself with emoji picker integration
- **Profile Management** - Customize your profile with avatar uploads
- **Online Status** - See when users are online in real-time

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **Zustand** | State management |
| **Socket.IO Client** | Real-time communication |
| **React Router DOM** | Client-side routing |
| **Radix UI** | Accessible UI components |
| **GSAP** | Smooth animations |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **Socket.IO** | Real-time WebSocket server |
| **JWT** | Authentication tokens |
| **Bcrypt** | Password hashing |
| **Cloudinary** | Image storage & CDN |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityanarayan26/Mern-Chat-App.git
   cd Mern-Chat-App
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file with:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev

   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
Mern-Chat-App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   └── lib/            # Utilities & helpers
│   └── ...
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middlewares/        # Auth & other middleware
│   └── lib/                # DB, socket, cloudinary config
└── README.md
```

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own chat application!
