import transporter from "../utils/conf.mailgun.js";
import dotenv from 'dotenv';
dotenv.config();



const mainController = {
homePage: (request, response) => {
response.render('home.ejs')
},

contact: (request, response) => {
    response.render('contact.ejs')
},

sendMail: async (request, response) => {

  const { name, email, message } = request.body;
  
 // Envoyer un e-mail avec Mailgun et Nodemailer

const mailOptions = {
  from: `${email}`,
  to: process.env.MAIL,
  subject: `Nouveau message de ${name}`,
  text: `${message}\n\n--\n${name}\n${email}`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info);
  }
}); 
response.redirect('/contact')
}

}

export default mainController;