const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const crypto = require('crypto');
const homeRoute = require('./routes/homeRoute');
const trendingRoute = require('./routes/trendingRoute');
const loginRoute = require('./routes/loginRoute');
const promotionsRoute = require('./routes/promotionsRoute');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/artgallery', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'pages')));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.use('/home', homeRoute);
app.use('/trending', trendingRoute);
app.use('/login', loginRoute);
app.use('/promotions', promotionsRoute);
app.use('/auth', authRoutes);

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/homepagelogin', (req, res) => {
  console.log('Session user:', req.session.user);
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'pages', 'homepagelogin.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/getuserhomepagelogin', async (req, res) => {
  console.log('Inside /getuserhomepagelogin route');

  // Log the entire session object
  console.log('Session data:', req.session);

  // Check if the user is logged in
  if (!req.session.user || !req.session.user._id) {
    console.log('User not logged in or missing user ID');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the user ID from the session and convert it to a string
  const userId = req.session.user._id.toString();
  console.log('User ID from session:', userId);

  try {
    // Fetch user data from the database using _id
    const user = await User.findById(userId, 'username email');

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the retrieved user data
    console.log('Retrieved User data:', user);

    // Send the user data as JSON
    res.json({ _id: user._id.toString(), username: user.username, email: user.email });
  } catch (err) {
    console.error('Error fetching user:', err);
    // Add more detailed error information to the response
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
