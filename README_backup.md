# Revisit Category Management

A full-stack application for managing categories with user authentication.

## Features

- User authentication (login/register)
- Category management (create, view, update, delete)
- Responsive dashboard interface
- Protected routes for authenticated users

## Technology Stack

### Frontend
- React.js (Vite)
- React Router
- Context API for state management
- Axios for API calls
- Tailwind CSS (assuming from file structure)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud connection)
- Git (optional)

### Steps
1. Clone the repository
   ```bash
   git clone https://github.com/your-repo/revisit-category-management.git
   cd revisit-category-management
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with your environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

## Running the Application

1. Start the backend server
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server (in a separate terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173` (frontend default port)

## Project Structure

```
revisit-category-management/
├── backend/                  # Backend server code
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Authentication middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
│
└── frontend/                 # Frontend React app
    ├── public/               # Static assets
    ├── src/                  # Source code
    │   ├── components/       # Reusable components
    │   ├── context/          # React context providers
    │   ├── pages/            # Page components
    │   ├── services/         # API service modules
    │   ├── App.jsx           # Main app component
    │   └── main.jsx          # Entry point
    └── package.json          # Frontend dependencies
```


(Add screenshots of the application here)
>>>>>>> f403f2418bfaadd3cecd6d7cdc32f6170ced9fb7
=======
## Screenshots

(Add screenshots of the application here)

## License

MIT
=======

(Add screenshots of the application here)
>>>>>>> f403f2418bfaadd3cecd6d7cdc32f6170ced9fb7
