import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1 style='text-align: center; padding: 20px; color:#753a88'>Hello from user routes!</h1>`);
});

export const userRoutes = router;