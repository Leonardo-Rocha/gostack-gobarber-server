interface MailProvider {
  sendMail(to: string, body: string): Promise<void>;
}

export default MailProvider;
