require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getDB } = require('./database');
const { router: authRoutes } = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const careerRoutes = require('./routes/careerRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB before starting server
getDB().then(() => {
    console.log('Database initialized successfully');
}).catch(err => {
    console.error('Failed to initialize database', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('AMRA Geogreen Works API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
