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
   # Server Configuration
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=production
   
   # Database Configuration
   MONGO_URI=your_mongodb_connection_string
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   
   # CORS Configuration (comma-separated list of allowed origins)
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   
   # API URL for Swagger Documentation (optional)
   API_URL=https://api.yourdomain.com
   ```
   
   **Example for local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=development
   ```
   
   **Example for MongoDB Atlas (Production):**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=production
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   API_URL=https://api.yourdomain.com
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
- `npm run pm2:start` - Start the server using PM2 process manager
- `npm run pm2:stop` - Stop the PM2 process
- `npm run pm2:restart` - Restart the PM2 process
- `npm run pm2:logs` - View PM2 logs
- `npm run pm2:monit` - Monitor PM2 processes

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

---

## EC2 Deployment Guide

This guide will help you deploy the Task Management Backend on an Amazon EC2 instance.

### Prerequisites

- An AWS EC2 instance (Ubuntu 20.04 or later recommended)
- SSH access to your EC2 instance
- MongoDB Atlas account (recommended) or MongoDB installed on EC2
- Domain name (optional, for production)

### Step 1: Connect to Your EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip-address
```

### Step 2: Install Node.js

```bash
# Update package list
sudo apt update

# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Step 4: Clone Your Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository (replace with your actual repo URL)
git clone https://github.com/yourusername/upmatrics-task-backend-node.git

# Navigate to project directory
cd upmatrics-task-backend-node
```

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Set Up Environment Variables

```bash
# Create .env file
nano .env
```

Add the following configuration (adjust values as needed):

```env
# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=production

# Database Configuration (Use MongoDB Atlas for production)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority

# JWT Configuration (Generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

# CORS Configuration (Add your frontend domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# API URL for Swagger Documentation
API_URL=https://api.yourdomain.com
# Or use EC2 public IP: API_URL=http://your-ec2-ip:3000
```

Save and exit (Ctrl+X, then Y, then Enter).

### Step 7: Configure Security Group

In AWS Console, configure your EC2 Security Group to allow inbound traffic:

- **Type:** Custom TCP
- **Port:** 3000 (or your configured PORT)
- **Source:** 0.0.0.0/0 (for public access) or your specific IP/range

### Step 8: Start the Application with PM2

```bash
# Start the application
npm run pm2:start

# Or manually:
pm2 start ecosystem.config.js --env production

# Save PM2 configuration to restart on reboot
pm2 save
pm2 startup
```

### Step 9: Verify the Application

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs

# Test the API
curl http://localhost:3000
```

### Step 10: Set Up Nginx (Optional but Recommended)

For production, it's recommended to use Nginx as a reverse proxy:

```bash
# Install Nginx
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/task-api
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Replace with your domain or EC2 IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/task-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 11: Set Up SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Certbot will automatically renew certificates
```

### Useful PM2 Commands

```bash
# View application status
pm2 status

# View logs
pm2 logs task-management-api

# Restart application
pm2 restart task-management-api

# Stop application
pm2 stop task-management-api

# Monitor resources
pm2 monit

# View detailed information
pm2 show task-management-api
```

### Troubleshooting EC2 Deployment

**Issue: Cannot connect to the server**
- Check Security Group rules (port 3000 should be open)
- Verify the application is running: `pm2 status`
- Check logs: `pm2 logs`

**Issue: CORS errors**
- Update `ALLOWED_ORIGINS` in `.env` file with your frontend domain
- Restart the application: `pm2 restart task-management-api`

**Issue: MongoDB connection failed**
- Verify MongoDB Atlas network access allows your EC2 IP
- Check `MONGO_URI` in `.env` file
- Test connection: `curl https://your-mongodb-cluster.mongodb.net`

**Issue: Application crashes on restart**
- Check PM2 logs: `pm2 logs`
- Verify all environment variables are set correctly
- Ensure MongoDB is accessible from EC2

**Issue: Port already in use**
- Check what's using the port: `sudo lsof -i :3000`
- Kill the process or change PORT in `.env`

### Monitoring and Maintenance

```bash
# Set up PM2 to start on system boot
pm2 startup
pm2 save

# Monitor application
pm2 monit

# View application info
pm2 info task-management-api
```

### Backup Recommendations

1. **Environment Variables:** Keep your `.env` file secure and backed up
2. **Database:** Set up automated MongoDB Atlas backups
3. **Application Logs:** Regularly check PM2 logs for errors
4. **File Uploads:** Consider using S3 for file storage instead of local filesystem

---

## Production Checklist

- [ ] Environment variables configured in `.env`
- [ ] MongoDB Atlas connection string set up
- [ ] Security Group configured to allow traffic on port 3000
- [ ] PM2 process manager installed and configured
- [ ] Application starts automatically on reboot
- [ ] CORS origins configured for your frontend domain
- [ ] SSL certificate installed (if using domain)
- [ ] Nginx reverse proxy configured (optional but recommended)
- [ ] Logs directory created: `mkdir -p logs`
- [ ] Regular backups configured