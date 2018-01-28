module.exports = function(app) {

    var notes = require('../controllers/appController.js');

    // Create a new Note
    app.post('/vcode', notes.create);

}
