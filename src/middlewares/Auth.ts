import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_API_KEY } from '../config/secret';

export const Auth = (request: Request, response: Response, next: NextFunction) => {
    const authorization: string = request.headers['authorization'];
    const token: string = (String(authorization).startsWith('Bearer ')) ? authorization.slice(7, authorization.length) : authorization;
    if (token) {
        jwt.verify(token, SECRET_API_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return response.status(401).json({ error: `Token Expired` });
                }
                return response.status(401).json({ error: `Invalid Token` });
            }
            request.body.auth = decoded;
            return next();
        });
    } else {
        return response.status(401).json({ error: "Unauthorized" });
    }
}