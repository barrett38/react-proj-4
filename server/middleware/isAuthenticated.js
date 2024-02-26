require("dotenv").config(); // Load environment variables .env
const jwt = require("jsonwebtoken"); // Import for handling JWTs
const { SECRET } = process.env; // Extract the SECRET variable from process.env

// Export a middleware function for checking authentication
module.exports = {
  isAuthenticated: (req, res, next) => {
    // Retrieve the token from the request headers
    const headerToken = req.get("Authorization");

    // Check if token exists in the request headers
    if (!headerToken) {
      console.log("ERROR IN auth middleware"); // Error if token is missing
      res.sendStatus(401); // Send a 401 Unauthorized status code
    }

    let token;

    try {
      // Verify the token using the SECRET key
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      // Handle errors thrown during token verification
      err.statusCode = 500; // Set status code to 500 Internal Server Error
      throw err; // Throw the error for further handling
    }

    // Check if token is valid and not expired
    if (!token) {
      // If token is invalid, create and throw an error
      const error = new Error("Not authenticated.");
      error.statusCode = 401; // Set status code to 401 Unauthorized
      throw error; // Throw the error for further handling
    }

    // If token is valid, call the next middleware function
    next();
  },
};
