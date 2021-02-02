import handlebars from 'handlebars';

import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';
import MailTemplateProvider from '../models/MailTemplateProvider';

class HandlebarsMailTemplateProvider implements MailTemplateProvider {
  public async parse({
    template,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
