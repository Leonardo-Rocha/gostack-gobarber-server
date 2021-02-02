interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplateDTO {
  template: string;
  variables: TemplateVariables;
}

export default ParseMailTemplateDTO;
