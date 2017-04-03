module.exports = {
  getRoom: (hz, db, name) =>
    hz.r.table('rooms')
      .getAll(name, { index: 'hz_[["name"]]' })
      .coerceTo('array')
      .run(db.connection()),
};
