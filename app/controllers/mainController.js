import sgMail from "@sendgrid/mail";

const mainController = {
homePage: (request, response) => {
response.render('home.ejs')
},

contact: (request, response) => {
    response.render('contact.ejs')
},

sendEmail: (request, response) => {
    const { name, email, message } = request.body;
    const mailOptions = {
        to: 'frewmike17@gmail.com',
        from: email,
        subject: `Vous avez reçu un nouveau message de ${name}`,
        text: `${message}\n\n--\n${name}\n${email}`,
    };
      // Envoi de l'e-mail via SendGrid
  sgMail.send(mailOptions)
  .then(() => {
    console.log('E-mail envoyé avec succès');
    res.status(200).send('E-mail envoyé avec succès');
  })
  .catch((error) => {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error.response.body);
    res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
  });

}
}

export default mainController;