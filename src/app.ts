import 'reflect-metadata';
import 'express-async-errors';
import './database';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from './errors/AppError';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
      error: error,
      message: `Internal server error.`,
    });
  }
);
