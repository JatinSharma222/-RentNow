# RentNow

RentNow is a Node.js-based web application built using Express. The app enables users to rent or host rooms with ease, creating a seamless experience for both guests and hosts.

## Features

- **User Authentication**: Secure user registration and login.
- **Room Listings**: Browse available rooms with detailed descriptions and images.
- **Hosting**: Allow users to list their rooms for rent with customizable options.
- **Search and Filter**: Search rooms by location, price, and other criteria.
- **Responsive Design**: Mobile-friendly interface for smooth browsing on any device.

## Project Structure

The project is divided into two main folders:

- **frontend**: Contains the client-side code, including the user interface built with React.
- **backend**: Contains the server-side code, including API endpoints, database models, and business logic.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/JatinSharma222/RentNow.git
   cd RentNow
   ```

2. **Install Dependencies**:

   - Navigate to the `backend` folder and install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Navigate to the `frontend` folder and install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` folder and add the following:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:

   - Start the backend server:
     ```bash
     cd backend/src
     nodemon app.js
     ```
   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```

   The app will be available at `http://localhost:3000`.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: Mongoose, Dotenv, bcrypt

## API Endpoints

### Authentication

- **POST /register**: Register a new user
- **POST /login**: User login

### Rooms

- **GET /auth/rooms**: Fetch all rooms
- **POST /auth/host/registerRoom**: Create a new room (for hosts)
- **GET /auth/rooms/:id**: Get details of a specific room
- **PUT /auth/rooms/:id**: Update room details
- **DELETE /auth/rooms/:id**: Delete a room listing

## Usage

1. **Register or Login**:

   - New users can register using their email, password, and phone number.
   - Existing users can log in to access their account.

2. **Browse Rooms**:

   - View available rooms on the homepage.
   - Use filter options to refine results by room type.

3. **Host a Room**:

   - Navigate to the "Host Room" section to list a room for rent.
   - Provide details such as room description, price, and images.

4. **Room Details**:

   - Click on a room listing to view detailed information.

## Contributing

Contributions are welcome! If you'd like to improve RentNow, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or support, please contact:

- **Name**: Jatin Sharma
- **Email**: sharma.jatin2206@gmail.com
- **GitHub**: [JatinSharma222](https://github.com/JatinSharma222)

