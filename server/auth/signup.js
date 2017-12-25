const dbw = require('../db/wrapper').dbw;
const bcrypt = require('bcrypt');
const config = require('../../config');
const { sendEmail } = require('../email/send');


const uuid = require('uuid');

function hashPass(password, rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, rounds, (err, hash) => {
      if (err) { reject(err); return; }
      resolve(hash);
    });
  });
}

function signup(body) {
  return new Promise((resolve, reject) => {
    const data = {
      fullName: body.fullName,
      email: body.email,
      password: body.password,
      activated: false,
      activation_id:uuid.v1(),
    };
    return hashPass(data.password, config.saltRounds).then((hash) => {
      data.password = hash;
      dbw.insert('users', data).then(() => {
        var message = "https://coinscoot.com/activate/"+data.activation_id
        return sendEmail(data.email, "Activate account | CoinScoot", message, altText = "")
        .then(()=>{
          var result = {
            success: true,
            message : "Activation Email Sent. Please Activate"
          }
          resolve(result);
        });
      }).catch((err) => {
        if (err.code === 11000) { // duplicate key
          reject('User Already exists.');
        } else {
          reject(err.code);
        }
      });
    });
  });
}

module.exports = {
  signup,
};
