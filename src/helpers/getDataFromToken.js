import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request = NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return null;
        }   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
        // return null; 
    }
};