/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ng2              ->  index
 * POST    /api/ng2              ->  create
 * GET     /api/ng2/:id          ->  show
 * PUT     /api/ng2/:id          ->  update
 * DELETE  /api/ng2/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Ng2 = require('./ng2.model');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    entity = [{id:1, name:"Phantom"}]
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
  return function(entity) {
    if (entity) {
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
  return Ng2.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Hero from the DB
exports.show = function(req, res) {
  return Ng2.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Hero in the DB
exports.create = function(req, res) {
  return Ng2.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Hero in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
    console.log('Deleted _id')
  }
  return Ng2.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Hero from the DB
exports.destroy = function(req, res) {
  return Ng2.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
