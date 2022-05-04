import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mailAdapter";

class NodemailerMailAdapter implements MailAdapter{
  async sendMail ({ subject, body }: SendMailData): Promise<void> {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "536a1cba7a09ef",
        pass: "52ebfb4472695f"
      }
    });
    
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Matheus Baron <matheusbaron10@gmail.com>',
      subject,
      html: body
    })
  }
} 

export { NodemailerMailAdapter }