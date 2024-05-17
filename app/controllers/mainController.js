import transporter from "../utils/conf.mailgun.js";
import Joi from "joi";
import dotenv from 'dotenv';
dotenv.config();



const mainController = {
  homePage: (request, response) => {
    response.render('home.ejs')
  },
  
  contact: (request, response) => {
    
    response.render('contact.ejs', { errors: [] });
  },
  
  sendMail: async (request, response) => {
    const mailSchema = Joi.object({
      name: Joi.string().min(3).max(45).required().messages({
        'string.base': 'Le nom doit être une chaîne de caractères',
        'string.empty': 'Le nom est requis',
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'string.max': 'Le nom doit contenir au maximum 45 caractères',
        'any.required': 'Le nom est requis'
      }),
      email: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')).required().messages({
        'string.base': 'L\'email doit être une chaîne de caractères',
        'string.empty': 'L\'email est requis',
        'string.pattern.base': 'L\'email n\'est pas valide',
        'any.required': 'L\'email est requis'
      }),
      message: Joi.string().min(10).required().messages({
        'string.base': 'Le message doit être une chaîne de caractères',
        'string.empty': 'Le message est requis',
        'string.min': 'Le message doit contenir au moins 10 caractères',
        'any.required': 'Le message est requis'
      })
    });
  const { name, email, message } = request.body;

  // Validation des données du formulaire
  const { error, value } = mailSchema.validate(request.body);

  if (error) {
    // Renvoyer les erreurs de validation à l'utilisateur
    return response.render('contact', { errors: error.details });
  }

  // Si validation réussie, envoyer un e-mail avec Mailgun et Nodemailer
  const mailOptions = {
    from: `${email}`,
    to: process.env.MAIL,
    subject: `Nouveau message de ${name}`,
    text: `${message}\n\n--\n${name}\n${email}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return response.render('contact', { error: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' });
    } else {
      console.log('Email sent:', info);
      return response.redirect('/contact');
    }
  });
}
};

export default mainController;

