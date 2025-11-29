## System Design Diagram

You can view the system design in Excalidraw here:

- **Excalidraw link**: `https://excalidraw.com/#room=7837b40376ec30e56d5e,b2Wb_JX3FRslOBHXuNRNAw`

---

## Getting Started

This guide will help you set up and run the Task Management Backend project from scratch.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **MongoDB** - You can either:
  - Install MongoDB locally - [Download MongoDB](https://www.mongodb.com/try/download/community)
  - Use MongoDB Atlas (cloud) - [Sign up for free](https://www.mongodb.com/cloud/atlas/register)
- **npm** (comes with Node.js) or **yarn**

### Installation Steps

1. **Clone or download the project**
   ```bash
   cd upmatrics-task-backend-node
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory of the project:
   ```bash
   # Create .env file
   touch .env
   ```
   
   Add the following environment variables to your `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```
   
   **Example for local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   ```
   
   **Example for MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   ```
   
   > **Note:** Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret_key` with a secure random string.

4. **Start MongoDB** (if using local MongoDB)
   
   Make sure MongoDB is running on your system. If you installed MongoDB locally:
   ```bash
   # On Windows (if MongoDB is installed as a service, it should start automatically)
   # Or start manually:
   mongod
   ```

### Running the Project

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Verify Installation

1. **Check if server is running:**
   - Open your browser and visit: `http://localhost:3000`
   - You should see: "Hello World! Server is running and this is for testing server at /"

2. **Access API Documentation:**
   - Visit: `http://localhost:3000/api-docs`
   - This will show the Swagger UI with all available API endpoints

### Project Structure

```
upmatrics-task-backend-node/
├── config/          # Database and configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (authentication, etc.)
├── models/          # MongoDB models
├── routes/          # API routes
├── index.js         # Entry point
└── package.json     # Dependencies and scripts
```

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-reload (requires nodemon)

### Troubleshooting

**Issue: Cannot connect to MongoDB**
- Make sure MongoDB is running
- Check your `MONGO_URI` in the `.env` file
- Verify your MongoDB connection string is correct

**Issue: Port already in use**
- Change the `PORT` value in your `.env` file
- Or stop the process using port 3000

**Issue: Module not found errors**
- Run `npm install` again to ensure all dependencies are installed

### API Endpoints

Once the server is running, you can access:

- **Base URL:** `http://localhost:3000`
- **API Documentation:** `http://localhost:3000/api-docs`
- **Auth Routes:** `/api/auth/*`
- **Task Routes:** `/api/tasks/*` (protected)
- **Category Routes:** `/api/categories/*` (protected)
- **User Routes:** `/api/users/*` (protected)

> **Note:** Most routes require authentication. You'll need to register/login first to get a JWT token, then include it in the `Authorization` header as `Bearer <token>`.