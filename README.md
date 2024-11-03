# JWT Protected API

Welcome to the repository for the **JWT Protected API**, a secure RESTful API that provides user authentication and protects resources using JSON Web Tokens (JWT).

## Table of Contents

- [Project Overview](#project-overview)
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Project Overview

The JWT Protected API project provides a secure backend solution for user authentication and access to protected resources. It uses JWT for authentication, enabling users to log in, receive tokens, and access protected routes.

## Functionalities

- User authentication (sign up, login, token refresh)
- Protected API endpoints that require JWT for access
- Secure handling of access and refresh tokens
- Error handling for authentication and authorization failures

## Technologies

### Backend

- **Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv

### Frontend (Example Usage)

- **HTTP Client**: Axios
- **Framework**: React

## Installation

To set up the JWT Protected API project locally, follow these steps:

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RIADH-NOURI/Jwt-project.git
    cd Jwt-project/service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the environment variables:**
   Create a `.env` file in the `service` directory and add the necessary configurations:

   ```plaintext
   PORT=3000
   DATABASE_URL=your_database_url
   ACCESS_TOKEN_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token
   ```
   4. **Run the application:**

   ```bash
   npm start
   ```

### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd ../client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

## Usage

1. **Run the backend server**: Start the backend server using `npm start` in the `service` directory.
2. **Run the frontend application**: Start the frontend application using `npm start` in the `client` directory.

## Contributors

- [RIADH-NOURI](riadhnouri0502@gmail.com)

