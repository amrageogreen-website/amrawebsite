const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getDB } = require('../database');

const JWT_SECRET = 'amra_geogreen_super_secret_key_2024';

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await getDB();
        
        const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ success: true, token, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ success: false, message: 'No token provided' });
    
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });
        req.userId = decoded.id;
        next();
    });
};

module.exports = { router, verifyToken };
