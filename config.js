module.exports = {
  port: 3012,
  db: {
    url: 'mongodb://localhost:27017/coinscoot',
    index: { email: 1 },
  },
  auth: {
  },
  saltRounds: 11,
};