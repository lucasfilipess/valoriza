import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }
  const [bearer, token] = authToken.split(' ');
  if (bearer !== 'Bearer') {
    return response.status(401).end();
  }
  try {
    const { sub } = verify(token, process.env.SECRET) as IPayload;
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
