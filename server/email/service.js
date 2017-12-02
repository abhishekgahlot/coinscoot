const { sendEmail, sendRawEmail } = require('./send');

let sendWelcomeEmail = (to) => {
    let subject = "Welcome to CoinScoot";
    let message = "Welcome to coinscoot.";

    return sendEmail(to, subject, message)
    .then((result) => {
        if (condition) {
            
        }
    })
}


module.exports = {
    sendEmail,
};
