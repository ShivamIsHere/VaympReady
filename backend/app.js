// Ensure dotenv is loaded at the very top of your entry file (e.g., app.js or server.js)
require('dotenv').config({ path: './config/.env' });
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const { isAuthenticated, isSeller, isAdmin } = require("./middleware/auth");
// const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary
// Initialize Express
const app = express();
require('./config/passport')(passport); // Load passport configuration
const dotenv=require('dotenv');
// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000'], // Allowed origin
  credentials: true, // Allow credentials (cookies)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

// Session middleware (Must be before passport middleware)
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);



app.use(passport.initialize());
app.use(passport.session());


// Parse cookies
app.use(cookieParser());

// Body parsing middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// Test route
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// Protected routes using middleware
app.get("/api/v2/user/protected", isAuthenticated, (req, res) => {
  res.send(`Hello, ${req.user.name}`);
});

app.get("/api/v2/shop/protected", isSeller, (req, res) => {
  res.send(`Hello, ${req.seller.name}`);
});

app.get("/api/v2/admin/protected", isAuthenticated, isAdmin('Admin'), (req, res) => {
  res.send(`Hello, Admin ${req.user.name}`);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Import and use routes
app.use("/api/v2/authRoutes", require("./routes/authRoutes"));  // Google OAuth routes
app.use("/api/v2/user", require("./controller/user"));
app.use("/api/v2/conversation", require("./controller/conversation"));
app.use("/api/v2/message", require("./controller/message"));
app.use("/api/v2/order", require("./controller/order"));
app.use("/api/v2/shop", require("./controller/shop"));
app.use("/api/v2/product", require("./controller/product"));
app.use("/api/v2/event", require("./controller/event"));
app.use("/api/v2/coupon", require("./controller/coupounCode"));
app.use("/api/v2/payment", require("./controller/payment"));
app.use("/api/v2/withdraw", require("./controller/withdraw"));
app.use("/api/v2/admin", require("./controller/admin"));
app.use("/api/v2/shopIsActive", require("./controller/shopIsActive"));
app.use("/api/v2/notification", require("./controller/notification"));
app.use("/api/v2/refund", require("./controller/refund"));
app.use("/api/v2/kuchvi", require("./controller/kuchvi"));

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
