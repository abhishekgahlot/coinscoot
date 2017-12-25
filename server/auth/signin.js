const dbw = require('../db/wrapper').dbw;
const bcrypt = require('bcrypt');

function signin(body) {
  const email = body.email;
  const password = body.password;
  return new Promise((resolve, reject) => {
    dbw.findOne('users', { email }).then((user) => {
      if (!user) { reject("Invalid Username/ Password"); return; }
      if (!user.activated) { reject("Please activate your account."); return; }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err || !res) {
          reject(err || res);
        } else {
          resolve(res);
        }
      });
    });
  });
}

module.exports = {
  signin,
};
