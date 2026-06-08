const express = require('express');
const router = express.Router();
const { getDB } = require('../database');

router.get('/', async (req, res) => {
    try {
        const db = await getDB();
        const applications = await db.all('SELECT * FROM applications ORDER BY id DESC');
        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, position, cv, cover_letter } = req.body;
        const db = await getDB();
        const date = new Date().toISOString().split('T')[0];
        
        await db.run(
            `INSERT INTO applications (name, email, phone, position, cv, cover_letter, date) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, position, cv, cover_letter, date]
        );

        res.status(200).json({ success: true, message: 'Application received successfully' });
    } catch (error) {
        console.error('Error handling application:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
