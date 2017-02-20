var express = require('express');
var Lob= require('../models/lob');
var SubLob = require('../models/sub_lob');

var subLobRouter = express.Router();

subLobRouter
  .route('/sublobs')
  .post(function (request, response) {

    console.log('POST /sublobs');

    var sub_lob = new SubLob({
      title: request.body.title,
      status: request.body.status,
      lob_id: request.body.lob_id
    });
    sub_lob.save(function(err) {
      if(err) {
        response.send(err);
        return;
      }
      else{
        response.json({ 
        success: true,
        message: 'Sub Lob has been created!'
      });
      }
      
    });

    /*var lob = new Lob(request.body);

    lob.save();*/

    /*response.status(201).send(lob);*/
  })
  .get(function (request, response) {

    console.log('GET /sublobs');

    SubLob.find(function (error, sub_lobs) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(sub_lobs);

      response.json(sub_lobs);
    });
  });

subLobRouter
  .route('/sublobs/by/lob/:lobId')
  .get(function (request, response) {

    console.log('GET /sublobs/by/lob/:lobId '+request.params.lobId);

    var lobId = request.params.lobId;
    console.log(lobId);

    SubLob.find({ lob_id: lobId }, function (error, sublob) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(sublob);

      response.json(sublob);

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

module.exports = subLobRouter;