import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';
import UsersRepository from '../repositories/UsersRepository';
import UsersTokensRepository from '../repositories/UsersTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('MailProvider')
    private mailProvider: MailProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: UsersTokensRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.usersTokensRepository.generate(foundUser.id);

    await this.mailProvider.sendMail({
      to: {
        name: foundUser.name,
        email: foundUser.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}. Seu token de recuperação é {{token}}',
        variables: { name: foundUser.name, token },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
