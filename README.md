# User Authentication API
This repository contains a small yet complete authentication service built with **Node.js** and **Express**. It demonstrates a common flow for registration, email verification and login using **JWTs** stored in HTTP-only cookies while **MongoDB** provides persistence.

## Features

- User registration with hashed passwords
- Email verification with expiring tokens
- Login and logout using JWT access and refresh tokens
- Protected routes via middleware that refreshes tokens automatically
- Profile retrieval after authentication

## Project Structure

```
.
├── controllers     # Route handlers
├── middlewares     # Authentication middleware
├── models          # Mongoose schemas
├── routes          # Express routes
├── utils           # DB connection and mail helper
├── server.js       # Application entry point
└── package.json
```

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/auth_db
ACCESS_TOKEN_SECRET=<your secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=<your secret>
REFRESH_TOKEN_EXPIRY=7d
EMAIL_HOST=<smtp host>
EMAIL_PORT=587
EMAIL_USER=<smtp user>
EMAIL_PASS=<smtp password>
SENDER_EMAIL=<from address>
```

3. Start the development server:

```bash
npm run dev
```

The API will be available on `http://localhost:4000` by default.

## API Endpoints

- `POST /api/auth/register` – Register a new user and send a verification email
- `GET /api/auth/verify/:token` – Verify user email
- `POST /api/auth/login` – Login and receive tokens in cookies
- `POST /api/auth/logout` – Logout the authenticated user
- `GET /api/auth/getProfile` – Retrieve profile information (requires authentication)

## Request Flow

1. **Register** – User submits name, email and password. A verification link is emailed.
2. **Verify** – User opens the verification link to activate the account.
3. **Login** – After verification the user logs in. Access and refresh tokens are returned in HTTP-only cookies.
4. **Access Protected Routes** – Requests pass through the `isLoggedIn` middleware which validates/refreshes tokens and attaches the user object.
5. **Logout** – Refresh token is invalidated and cookies are cleared.

## Technology Stack

- **Node.js** with **Express** for the server framework
- **MongoDB** and **Mongoose** for the database layer
- **bcrypt** for password hashing
- **jsonwebtoken** for access and refresh tokens
- **nodemailer** for sending verification emails
- **cookie-parser** for managing cookies

## Development Scripts

- `npm run dev` – start the server with nodemon for auto reload
- `npm start` – start the server without watching files

---

Feel free to adapt the configuration to your own environment. This project provides a basic yet extendable authentication system you can integrate into larger applications.
