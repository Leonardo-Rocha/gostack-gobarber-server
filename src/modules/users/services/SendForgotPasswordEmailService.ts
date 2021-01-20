import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

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
  ) {}

  public async execute({ email }: Request): Promise<void> {
    await this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotPasswordEmailService;
