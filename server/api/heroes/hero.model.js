'use strict';

var mongoose = require('mongoose');

var HeroSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('ng2', HeroSchema);
