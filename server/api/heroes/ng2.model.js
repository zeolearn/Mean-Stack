'use strict';

var mongoose = require('mongoose');

var Ng2Schema = new mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('Ng2', Ng2Schema);
