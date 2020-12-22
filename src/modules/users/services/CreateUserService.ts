import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (userWithEmailAlreadyExists) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUserService;
