/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hero              ->  index
 * POST    /api/hero              ->  create
 * GET     /api/hero/:id          ->  show
 * PUT     /api/hero/:id          ->  update
 * DELETE  /api/hero/:id          ->  destroy
 */

//'use strict';

var _ = require('lodash');
var Hero = require('./hero.model');
var EventEmitter = require('events');

var eventEmitter = new EventEmitter();

var statusCode = 200;

function respondToEvent (){
  console.log('Responding to :', statusCode);
}
function respondToEventAndDoSomethingElse (){
  console.log('Responding to :', statusCode,' and doing something else');
}
eventEmitter.on('show', respondToEvent);
eventEmitter.on('show', respondToEventAndDoSomethingElse);

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  if(statusCode === 200) {eventEmitter.emit('show')}
  return function(entity) {
    // entity = [{id:1, name:"Phantom"}]
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    console.log()
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  console.log('CALLED REMOVE')
  return function(entity) {
    if (entity) {
        console.log('REMOVE ENTITY : ', entity)
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Heroes
exports.index = function(req, res) {
  return Hero.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Hero from the DB
exports.show = function(req, res) {
  return Hero.findById(req.params.id).exec()
  // return Hero.find({id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Hero in the DB
exports.create = function(req, res) {
  return Hero.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Hero in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
    console.log('Deleted _id')
  }
  // return Hero.findById(req.params.id).exec()
  return Hero.findById({id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Hero from the DB
exports.destroy = function(req, res) {
  return Hero.findById(req.params.id).exec()
  // return Hero.find({id: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
