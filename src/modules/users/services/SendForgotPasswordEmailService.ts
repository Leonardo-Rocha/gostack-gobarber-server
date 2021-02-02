import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
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

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
