let ses = require('node-ses')
const config = require('../../config');
let client = ses.createClient({ key: config.ses.key, secret: config.ses.secret });

let sendEmail = (to, subject, message, altText="") => {
    return new Promise((resolve, reject) => {
        client.sendEmail({
            // to: to
            to: "success@simulator.amazonses.com" //testing
            , from: 'support@coinscoot.com'
            , subject: subject
            , message: message
            , altText: altText
        }, (err, data, res) => {
            if (err || !res) {
                reject(err || res);
            } else {
                resolve(res);
            }
        })
    })
}

let sendRawMail = (to, rawMessage) => {
    return new Promise((resolve, reject) => {
        client.sendEmail({
            to: to
            , from: 'support@coinscoot.com'
            , rawMessage: rawMessage
        }, (err, data, res) => {
            if (err || !res) {
                reject(err || res);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = {
    sendEmail,
    sendRawMail
};
