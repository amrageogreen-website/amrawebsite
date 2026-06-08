const express = require('express');
const router = express.Router();
const { getDB } = require('../database');
const { verifyToken } = require('./authRoutes');

router.get('/', async (req, res) => {
    try {
        const db = await getDB();
        const projects = await db.all('SELECT * FROM projects ORDER BY id DESC');
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, category, location, year, status, client, budget, duration, description } = req.body;
        const db = await getDB();
        
        const result = await db.run(
            `INSERT INTO projects (title, category, location, year, status, client, budget, duration, description) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, category, location, year, status, client, budget, duration, description]
        );
        
        const newProject = await db.get('SELECT * FROM projects WHERE id = ?', result.lastID);
        res.json({ success: true, data: newProject, message: 'Project added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add project' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const db = await getDB();
        await db.run('DELETE FROM projects WHERE id = ?', req.params.id);
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
});

module.exports = router;
