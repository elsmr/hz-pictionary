module.exports = {
  storeUser: (hz, db, user) =>
    hz.r.table('hz_users')
      .insert(user, { conflict: 'replace' })
      .run(db.connection()),

  getUser: (hz, db, token) =>
    hz.r.table('hz_users')
      .getAll(token, { index: 'hz_[["token"]]' })
      .coerceTo('array')
      .run(db.connection()),
};
