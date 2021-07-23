import { ObjectSchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

export function ensureRequestBody(schema: ObjectSchema<any>) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { body } = request;
    try {
      await schema.validate(body, { abortEarly: false });
      return next();
    } catch (error) {
      return response.status(400).json({ error: error.errors.join(', ') });
    }
  };
}
