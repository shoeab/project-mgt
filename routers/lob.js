var express = require('express');
var Lob = require('../models/lob');

var lobRouter = express.Router();

lobRouter
  .route('/lobs')
  .post(function (request, response) {

    console.log('POST /lobs');

    var lob = new Lob({
      title: request.body.title,
      status: request.body.status,
      description: request.body.description
    });
    lob.save(function(err) {
      if(err) {
        response.send(err);
        return;
      }
      else{
        response.json({ 
        success: true,
        message: 'Lob has been created!'
      });
      }
      
    });

    /*var lob = new Lob(request.body);

    lob.save();*/

    /*response.status(201).send(lob);*/
  })
  .get(function (request, response) {

    console.log('GET /lobs');

    Lob.find(function (error, lobs) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(lobs);

      response.json(lobs);
    });
  });

lobRouter
  .route('/lobs/:lobId')
  .get(function (request, response) {

    console.log('GET /lobs/:lobId');

    var lobId = request.params.lobId;
    console.log(lobId);

    Lob.findOne({ _id: lobId }, function (error, lob) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(lob);

      response.json(lob);

    });
  })
  .put(function (request, response) {

    console.log('PUT /lobs/:lobId');

    var lobId = request.params.lobId;

    Lob.findOne({ id: lobId }, function (error, lob) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (lob) {
        lob.name = request.body.name;
        lob.description = request.body.description;
        lob.quantity = request.body.quantity;
        
        lob.save();

        response.json(lob);
        return;
      }

      response.status(404).json({
        message: 'Lob with id ' + lobId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /lobs/:lobId');

    var lobId = request.params.lobId;

    Lob.findOne({ id: lobId }, function (error, lob) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (lob) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof lob[property] !== 'undefined') {
              lob[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   lob.name = request.body.name;
        // }

        // if (request.body.description) {
        //   lob.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   lob.quantity = request.body.quantity;
        // }

        lob.save();

        response.json(lob);
        return;
      }

      response.status(404).json({
        message: 'Lob with id ' + lobId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /lobs/:lobId');

    var lobId = request.params.lobId;

    Lob.findOne({ id: lobId }, function (error, lob) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (lob) {
        lob.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Lob with id ' + lobId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Lob with id ' + lobId + ' was not found.'
        });
      }
    });
  });

module.exports = lobRouter;