# RentNow

RentNow is a full-stack web application that enables users to rent or host rooms. The platform offers a seamless experience for both guests and hosts, with features for room listings, booking management, and user authentication.

## Live Demo

- **Frontend:** [https://rentnowjash.netlify.app](https://rentnowjash.netlify.app)
- **Backend API:** [https://rentnow-backend.onrender.com](https://rentnow-backend.onrender.com)

## Features

- **User Authentication**: Secure user registration and login with JWT
- **Room Listings**: Browse available rooms with detailed descriptions and images
- **Hosting**: Allow users to list their rooms for rent with customizable options
- **Room Details**: View comprehensive information about each room including photos and location
- **Responsive Design**: Mobile-friendly interface for smooth browsing on any device
- **Protected Routes**: Secure access to host dashboard and user profiles

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application with React Router for navigation
- **Backend**: Node.js/Express API with MongoDB database

### Key Technologies

#### Frontend
- React
- React Router
- Context API for state management
- JWT for authentication

#### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)
- Git

### Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/JatinSharma222/RentNow.git
   cd RentNow
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd Backend
   npm install
   ```

3. **Configure Environment Variables**:
   
   Create a `.env` file in the Backend directory:

   ```
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Start the Backend Server**:

   ```bash
   npm start
   ```

5. **Install Frontend Dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

6. **Configure Frontend Environment Variables**:
   
   Create a `.env` file in the frontend directory:

   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

7. **Start the Frontend Development Server**:

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user
- **POST /auth/login**: User login
- **POST /auth/logout**: User logout
- **GET /auth/verify**: Verify authentication token

### Rooms

- **GET /rooms**: Get all available rooms
- **GET /rooms/:id**: Get details of a specific room
- **GET /rooms/:id/:infoType**: Get specific information (description, photos, location)
- **POST /registerRoom**: Create a new room listing

### User

- **GET /host**: Get host profile and room listings
- **GET /profile**: Get user profile information

## Deployment

### Frontend (Netlify)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Add environment variables in Netlify settings

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables in Render settings

## Contributing

Contributions are welcome! If you'd like to improve RentNow, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact:

- **Name**: Jatin Sharma
- **Email**: sharma.jatin2206@gmail.com
- **GitHub**: [JatinSharma222](https://github.com/JatinSharma222)