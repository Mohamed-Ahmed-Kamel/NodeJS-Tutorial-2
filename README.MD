# Express.js Application

This is an Express.js application that uses Passport.js for authentication and includes routes for managing a pharmacy, markets, and user authentication.

## Features

- Middleware for parsing JSON and URL-encoded request bodies, parsing cookies, and managing sessions using `express-session` and `connect-mongo`.
- Passport.js middleware for handling user authentication using the local and Discord strategies.
- Routes for managing a pharmacy, markets, and user authentication.

## Usage

1. Install dependencies: `npm install express cookie-parser express-session connect-mongo passport`.
2. Run the application using `node app.js`.
3. Use the `/api/v1/pharmacy`, `/api/v1/markets`, and `/api/v1/auth` routes to manage the pharmacy, markets, and user authentication, respectively.

# Pharmacy API

This is an Express.js API for managing a pharmacy's medication list and shopping cart.

## Features

- Authentication middleware to check if the user is authenticated before accessing the routes.
- GET route to retrieve the list of medications available in the pharmacy.
- GET route to retrieve information about a specific medication by its name.
- POST route to add a new medication to the pharmacy's medication list.
- GET route to retrieve the user's shopping cart from their session.
- POST route to add an item to the user's shopping cart.

## Usage

1. Install dependencies: `npm install express`.
2. Import the `route` object from this module and use it as middleware in your Express.js application.
3. Use the routes as described above to manage the pharmacy's medication list and shopping cart.

# Supermarket API

This is an Express.js API for retrieving information about supermarkets.

## Features

- Authentication middleware to check if the user is authenticated before accessing the routes.
- GET route to retrieve the list of supermarkets. The route accepts an optional `miles` query parameter to filter the supermarkets by their distance from the user.

## Usage

1. Install dependencies: `npm install express`.
2. Import the `route` object from this module and use it as middleware in your Express.js application.
3. Use the GET route with an optional `miles` query parameter to retrieve the list of supermarkets.

# Authentication API

This is an Express.js API for managing user authentication using Passport.js.

## Features

- POST route for logging in users using the local strategy with Passport.js.
- POST route for registering new users by creating a new user document in the database and hashing their password.
- GET routes for authenticating users using the Discord strategy with Passport.js.

## Usage

1. Install dependencies: `npm install express passport passport-local`.
2. Import the `route` object from this module and use it as middleware in your Express.js application.
3. Use the `/login` and `/register` routes to log in and register users, respectively.
4. Use the `/discord` and `/discord/redirect` routes to authenticate users using the Discord strategy with Passport.js.