# Event Management Application

## Overview

This is a full-stack event management application that allows users to create, update, and manage events, track sessions, and fetch weather information for event locations. The application is built using Node.js, Supabase, MongoDB, and is deployed on Render (backend) and Netlify (frontend).

## Features

- User Authentication
  - Json web token is used for authentication and authorization of a user and session storage to maintain token.
  - Secure storage of user information in MongoDB
- Event Management
  - Create, read, update, and delete events
  - Each event includes a name, date, location, and description
  - Integration with a weather API to fetch and display weather information for event locations
- API Endpoints
  - `POST /register`: Register a new user
  - `POST /login`: Log in an existing user and create a session
  - `POST /events`: Create a new event
  - `GET /events`: Retrieve all events for the logged-in user
  - `PUT /events/:id`: Update an event by ID
  - `DELETE /events/:id`: Delete an event by ID
  - `GET /weather/:location`: Fetch weather information for a given location
- Dark Mode Toggle for better UI experience

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Axios
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Day.js (for date formatting)
- **Deployment:**
  - Vercel (for backend)
  - Vercel (for frontend)

## Installation

### Prerequisites

- Node.js
- MongoDB
- Weather API account (e.g., OpenWeatherMap)

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/event-management-app.git
cd event-management-app

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/event-management-app.git
    cd event-management-app
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following environment variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    WEATHER_API_KEY=your_weather_api_key
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory with the following environment variables:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:5000
    REACT_APP_SUPABASE_URL=your_supabase_url
    REACT_APP_SUPABASE_KEY=your_supabase_anon_key
    ```

4. Start the frontend development server:

    ```bash
    npm start
    ```

## Deployment

### Backend and Frontend (Vercel)

1. Create a new project on Vercel and connect your GitHub repository.
2. Set the environment variables in the Vercel dashboard as specified in your `.env` files.
3. Deploy the project.

## Usage

1. Register a new user or log in with an existing account.
2. Create, update, or delete events.
3. View all events and their details.
4. Check the weather for event locations.
5. Toggle between light and dark modes for a better UI experience.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for providing the tools and libraries used in this project.