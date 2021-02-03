import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import MailProvider from '../models/MailProvider';
import MailTemplateProvider from '../../MailTemplateProvider/models/MailTemplateProvider';
import SendMailDTO from '../dto/SendMailDTO';

interface Message {
  to: string;
  body: string;
}

@injectable()
export default class EtherealMailProvider implements MailProvider {
  private mailClient: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProvider,
  ) {
    nodemailer
      .createTestAccount()
      .then(account => {
        this.mailClient = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        console.log('test account created:', this.mailClient);
      })
      .catch(err => console.log(err));
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const message = {
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    };

    const response = await this.mailClient.sendMail(message);

    console.log('Message sent: %s', response.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
  }
}
