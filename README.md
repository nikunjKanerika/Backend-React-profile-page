# Backend API for User Management

This project is a Node.js and Express-based backend that handles API requests for managing user details, retrieving user data, and saving user links. The backend interacts with a MongoDB database and uses Cloudinary for storing user profile images.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [POST /saveUser](#post-saveuser)
  - [GET /getUsers](#get-getusers)
  - [GET /getUser/:firstName](#get-getuserfirstname)
  - [POST /saveUserLinks](#post-saveuserlinks)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

These instructions will help you set up and run the backend locally.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database instance.
- Cloudinary account for image storage.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikunjKanerika/Backend-React-profile-page.git

2. Install packages
    ```bash
    npm install
### Running the Application
1. 
   ```bash
   node src/index.js
