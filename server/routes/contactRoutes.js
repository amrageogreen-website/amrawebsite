const express = require('express');
const router = express.Router();
const { getDB } = require('../database');

router.get('/', async (req, res) => {
    try {
        const db = await getDB();
        const enquiries = await db.all('SELECT * FROM enquiries ORDER BY id DESC');
        res.json({ success: true, data: enquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const db = await getDB();
        const date = new Date().toISOString().split('T')[0];
        
        await db.run(
            `INSERT INTO enquiries (name, email, phone, subject, message, date) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, phone, subject, message, date]
        );

        res.status(200).json({ success: true, message: 'Enquiry received successfully' });
    } catch (error) {
        console.error('Error handling enquiry:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
