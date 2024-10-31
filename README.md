
# Easyteam

A Node.js application using TypeScript, Mongoose, and Express with JWT authentication, role-based access, and first-run data seeding.

## Technologies

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Type-safe version of JavaScript for writing reliable code.
- **Mongoose**: ODM library for MongoDB, providing schema-based modeling.
- **bcrypt**: Library for password hashing.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **dotenv**: For managing environment variables securely.
- **Winston**: Logger for structured and flexible logging.
- **nodemon**: Automatically restarts the app in development mode.

## Features

- **Employee and Location Management**: API for CRUD operations on employees and locations.
- **Authentication**: Secure login with JWT and password hashing (bcrypt).
- **Role-based Access**: Access control based on employee roles (admin vs. regular).
- **First-run Seeding**: Automatically seeds the database with initial data upon the first run.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Seeding Data](#seeding-data)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/repo-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd repo-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Make sure MongoDB is running locally or remotely and configure the connection in the environment variables.

5. Add priv.key file at the root 

## Scripts

### Running the Application

#### Development Mode

Runs the app in development mode with auto-restart on file changes.

```bash
npm run dev
```

#### Production Mode

1. Build the TypeScript files:
   ```bash
   npm run build
   ```
2. Start the application:
   ```bash
   npm start
   ```

#### Run Seeding Manually

If you'd like to re-seed data (if the seeding script is available):

```bash
npm run seed
```

## Environment Variables

Make sure to create a `.env` file in the root directory with the following variables:

```plaintext
PORT=8000
MONGO_URI=mongodb://localhost:27017/your-database
LOG_LEVEL=info
```

> **Note**: Adjust the `MONGO_URI` and `JWT_SECRET` according to your setup.

## API Endpoints

### Auth Endpoints

- **POST /api/auth/login**: Login for employees. Returns JWT token.
- **POST /api/auth/register**: register for employees. Returns JWT token.

### Employee Endpoints

- **GET /api/employees**: Retrieve all employees (admin only).
- **POST /api/employees**: Create a new employee.
- **GET /api/employees/:id**: Retrieve employee by ID.
- **PUT /api/employees/:id**: Update an employee by ID.
- **DELETE /api/employees/:id**: Delete an employee by ID.

### Location Endpoints

- **GET /api/locations**: Retrieve all locations.
- **POST /api/locations**: Create a new location.
- **GET /api/locations/:id**: Retrieve location by ID.
- **PUT /api/locations/:id**: Update a location by ID.
- **DELETE /api/locations/:id**: Delete a location by ID.

### Settings Endpoints

- **GET /api/settings**: Retrieve settings.
- **POST /api/settings**: Create a new setting (e.g., for `isGlobalTrackingEnabled`).
- **PUT /api/settings/:id**: Update an existing setting by ID.

## Seeding Data

The application automatically seeds data for locations and settings if it's the first time the app is run. This includes default employees, locations, and settings for global tracking.

To manually trigger a re-seed, use:

```bash
npm run seed
```

