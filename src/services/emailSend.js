const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #TemplateGenerator = Mailgen;

  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#TemplateGenerator({
      theme: 'cerberus',
      product: {
        name: 'System Contacts',
        link: 'http://localhost:3000/',
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with us, please click here:',
          button: {
            color: '#22BC33', 
            text: 'Confirm your account',
            link: `http://localhost:3000/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    return emailBody;
  }

  async sendEmail(verifyToken, name, email) {
    const emailBody = this.#createTemplate(verifyToken, name);

    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, 
      from: '1911.denis54@gmail.com', 
      subject: 'Sending with SendGrid is Fun',
      html: emailBody,
    };

    await this.#sender.send(msg);
  }
}

module.exports = EmailService;