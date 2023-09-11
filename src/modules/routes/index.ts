import express from 'express';
import { userRoutes } from '../user/user.routes';
import { authRoutes } from '../auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
];

moduleRoutes.forEach((route) => { 
    router.use(route.path, route.route);
});

export default router;