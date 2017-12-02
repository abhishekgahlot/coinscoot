module.exports = {
  port: 3012,
  db: {
    url: 'mongodb://localhost:27017/coinscoot',
    index: { email: 1 },
  },
  auth: {
  },
  saltRounds: 11,
  ses : {
    key: "AKIAINWOFAHAVCZ4BGVQ",
    secret: "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"
  }
};