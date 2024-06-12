import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'servigo35@gmail.com',
    pass: 'servigo1234'
  }
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'servigo35@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};
