import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from './../repositories/UsersRepositories';
interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({ email });
    if (!user) {
      throw new AppError('Email/Password incorrect');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email/Password incorrect');
    }
    const token = sign({ email: user.email }, process.env.SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });
    return token;
  }
}
