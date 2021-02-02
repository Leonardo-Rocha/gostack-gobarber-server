import SendMailDTO from '../dto/SendMailDTO';

interface MailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}

export default MailProvider;
