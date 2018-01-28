const smsvRoutes = require('./smsverifyRoute');
module.exports = function(app, db) {
  smsvRoutes(app, db);
  // Other route groups could go here, in the future
};
