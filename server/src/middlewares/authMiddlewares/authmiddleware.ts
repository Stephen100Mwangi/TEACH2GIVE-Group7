// middlewares/authMiddlewares/authMiddleware.ts
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomeRequest } from '../../types/CustomeReuest'; // Ensure this path is correct

const JWT_SECRET = 'your_jwt_secret_key';

export const authenticateJWT = (req: CustomeRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as CustomeRequest).user = decoded;  // Use type assertion to access 'user'
        next();  // Proceed to the next middleware
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
