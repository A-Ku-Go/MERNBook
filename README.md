# MERNBook

MERNBook is a full-stack bookstore application built with the MERN stack:
- **MongoDB** for data storage
- **Express** and **Node.js** for the backend API
- **React** for the frontend UI

## Project Structure

- `backend/` - Express server, MongoDB models, controllers, and routes
- `frontend/` - React app with pages for browsing books, cart, orders, and authentication

## Features

- User registration and login
- JWT-based authentication
- Book catalog browsing
- Shopping cart management
- Order creation and history
- Separate frontend and backend codebases

## Setup

### 1. Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with these variables:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

The backend runs on `http://localhost:5000` by default.

### 2. Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

The frontend runs on `http://localhost:3000` and communicates with the backend at `http://localhost:5000/api`.

## Notes

- Do not commit `.env` or any secret values to version control.
- The current frontend API base URL is configured in `frontend/src/api/axios.js`.
- The backend entry point is `backend/server.js`.

## Useful Commands

From project root:
- `cd backend && npm install`
- `cd backend && npm start`
- `cd frontend && npm install`
- `cd frontend && npm start`

## License

This project is for educational purposes.
