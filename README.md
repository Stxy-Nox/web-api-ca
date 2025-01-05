

# Assignment 2 - Web API

**Name**: Shuobin Wang

**ID**: 20108800

## Features



- User's specific data store(favorites, playlist) in local MongoDB.
- User's reviews store in addition collection in local MongoDB.

- All endpoints in WEB REACT CA now handle by back-end API router.
- Users can add, delete, and update their favorites, playlist in front-end.
- The home page, upcoming page, people page support pagination.
- When access without login, automatically redirect to the login page.

## Setup Requirements

Follow these steps to set up the project locally:

1. Install dependencies in each folder:

   ```bash
   cd .\movies-api\
   npm install
   cd .\react-movies\
   npm install
   ```

2. Run the back-end server: (make sure you have mongodb installed. )

   ```bash
   cd .\movies-api\
   npm run dev #automatically seed mongodb for development
   ```

3. Run the application:

   ```bash
   npm start
   ```

   

## API Configuration

Create a `.env` file in the "movies-api" folder of the project with the following variables:

```
NODE_ENV=dev
PORT=8080
HOST=localhost
mongoDB=YourMongoDBURL
secret=YourJWTSecret
TMDB_KEY=YOUR_TMDB_KEY
```



## API Design

### Endpoints Overview

- **Movies**:
  - `/api/movies` | `GET` | Fetch a paginated list of movies.
  - `/api/movies/:id` | `GET` | Fetch details of a specific movie.
  - `/api/movies/tmdb/upcoming` | `GET` | Fetch upcoming movies from TMDB API.
  - `/api/movies/tmdb/trending` | `GET` | Fetch trending movies from TMDB API.
  - `/api/movies/tmdb/genres` | `GET` | Fetch genres from TMDB API.
- **Users**:
  - `/api/users` | `POST` | Register or authenticate a user.
  - `/api/users/favorites` | `GET` | Fetch a user's favorite movies.
  - `/api/users/favorites` | `POST` | Add a movie to a user's favorites.
  - `/api/users/favorites/:movieId` | `DELETE` | Remove a movie from a user's favorites.
  - `/api/users/playlist` | `GET` | Fetch a user's playlist.
  - `/api/users/playlist` | `POST` | Add a movie to a user's playlist.
  - `/api/users/playlist/:movieId` | `DELETE` | Remove a movie from a user's playlist.
- **Reviews**:
  - `/api/reviews` | `GET` | Fetch all reviews by the authenticated user.
  - `/api/reviews` | `POST` | Add a new review for a movie.
  - `/api/reviews/:id` | `GET` | Fetch a specific review by ID.
  - `/api/reviews/:id` | `DELETE` | Delete a review by ID.

------



## Security and Authentication

### Authentication Implementation:

- JWT-based Authentication:
  - Users are authenticated via a JWT issued during login or registration.
  - Tokens must be included in the `Authorization` header as `Bearer <token>`.

### Protected Routes:

- `/users/favorites`
- `/users/playlist`
- `/reviews`

These routes are accessible only to authenticated users.

------

## Integrating with React App

### Views Using Web API:

- Favorites Page:
  - Displays the user's favorite movies managed through the Web API.
- Playlist Page:
  - Displays and allows management of the user's movie playlist.
- Review System:
  - Allows users to add  reviews.
- Authentication:
  - Users can register and log in to access protected pages.

### Updates from Assignment 1:

- Replaced TMDB-only data with custom user-generated content such as favorites, playlists, and reviews.
- Added authentication flow using React Context (`AuthContext`).
- Refactored API calls using Axios interceptors for automatic token management.

------

