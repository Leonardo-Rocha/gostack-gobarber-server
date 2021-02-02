import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import HashProvider from '../providers/HashProvider/models/HashProvider';
import UsersRepository from '../repositories/UsersRepository';
import UsersTokensRepository from '../repositories/UsersTokensRepository';

interface Request {
  token: string;
  newPassword: string;
}

@injectable()
class ResetPasswordService {
  private tokenExpirationHours = 2;

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: UsersTokensRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ token, newPassword }: Request): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('UserToken does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    // Token is valid until this compareDate
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(newPassword);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
