import ParseMailTemplateDTO from '../../MailTemplateProvider/dtos/ParseMailTemplateDTO';

interface MailContact {
  name: string;
  email: string;
}

interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
}

export default SendMailDTO;
