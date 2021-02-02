import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

interface MailTemplateProvider {
  parse(mailInfo: ParseMailTemplateDTO): Promise<string>;
}

export default MailTemplateProvider;
