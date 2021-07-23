import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    if (!email) {
      throw new AppError('Email incorrect');
    }
    const userAlreadyExists = await usersRepositories.findOne({ email });
    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }
    const passwordHash = await hash(password, 8);
    const user = usersRepositories.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
    await usersRepositories.save(user);
    return user;
  }
}
