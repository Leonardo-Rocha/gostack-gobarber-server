import nodemailer, { Transporter } from 'nodemailer';
import MailProvider from '../models/MailProvider';

interface Message {
  to: string;
  body: string;
}

export default class EtherealMailProvider implements MailProvider {
  private mailClient: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.mailClient = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    };

    const response = await this.mailClient.sendMail(message);

    console.log('Message sent: %s', response.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(response));
  }
}
