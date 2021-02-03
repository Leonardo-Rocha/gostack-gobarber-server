interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateVariables;
}

export default ParseMailTemplateDTO;
