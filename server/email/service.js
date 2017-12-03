const { sendEmail, sendRawEmail } = require('./send');

let sendWelcomeEmail = (to) => {
    let subject = "Welcome to CoinScoot";
    let message = "Welcome to coinscoot.";

    return sendEmail(to, subject, message)
    .then((result) => {
         return {
             status : true,
             message : `E-mail has been sent to ${to}`
         }
    })
    .catch((err) => {
        return {
            status : false,
            message : err.message
        }
    })
}


module.exports = {
    sendWelcomeEmail,
};
