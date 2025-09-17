# Town Drive Backend (`/server`)

This backend is built with Node.js and Express for the Town Drive application. It provides RESTful APIs for user management, car owners, and booking operations.

## API Endpoints

### User Endpoints (`/api/user`)

- `POST /api/user/register`  
  Register a new user.

- `POST /api/user/login`  
  Login and receive JWT token.

- `GET /api/user/data`  
  Get authenticated user data (requires JWT).

- `GET /api/user/cars`  
  Get list of all cars.

### Owner Endpoints (`/api/owner`)

- `POST /api/owner/change-role`  
  Change user role to owner (requires JWT).

- `POST /api/owner/add-car`  
  Add a new car (requires JWT, image upload).

- `GET /api/owner/cars`  
  Get all cars owned by the authenticated owner.

- `POST /api/owner/toggle-car`  
  Toggle car availability (requires JWT).

- `POST /api/owner/delete-car`  
  Delete a car (requires JWT).

- `GET /api/owner/dashboard`  
  Get dashboard data for owner (requires JWT).

- `POST /api/owner/update-image`  
  Update owner's profile image (requires JWT, image upload).

### Booking Endpoints (`/api/bookings`)

- `POST /api/bookings/check-availability`  
  Check if a car is available for booking.

- `POST /api/bookings/create`  
  Create a new booking (requires JWT).

- `GET /api/bookings/user`  
  Get bookings for the authenticated user.

- `GET /api/bookings/owner`  
  Get bookings for the authenticated owner.

- `POST /api/bookings/change-status`  
  Change booking status (requires JWT).

## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Set up environment variables in `.env` (see `dotenv` usage).
3. Start the server:
   ```
   node server.js
   ```
   or
   ```
   npm start
   ```

## Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

- `PORT` — Port number for the server (default: 3000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for JWT authentication
- `IMAGEKIT_PUBLIC_KEY` — ImageKit public key
- `IMAGEKIT_PRIVATE_KEY` — ImageKit private key
- `IMAGEKIT_URL_ENDPOINT` — ImageKit URL endpoint

## Notes

- All protected routes require a valid JWT token in the `Authorization` header.
- Image uploads use Multer and ImageKit.
- MongoDB is required for data storage.

---
