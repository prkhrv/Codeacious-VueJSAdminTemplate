'use strict';


// Models
var mongoose = require('mongoose'),
  Listing = mongoose.model('sel_Listing');

exports.list_all_listings = function(req, res) {
    Listing.find({}, function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing);
    });
  };

exports.create_a_listing = function(req, res,) {
    var new_listing = new Listing(req.body);
    new_listing.save(function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing);

    });


  };

exports.read_a_listing = function(req, res) {
    Listing.findById(req.params.listId, function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing);
    });
  };

exports.update_a_listing = function(req, res) {
    Listing.findOneAndUpdate({_id: req.params.listId}, req.body, {new: true}, function(err, listing) {
      if (err)
        res.send(err);
      res.json(listing);
    });
  };

exports.delete_a_listing = function(req, res) {
  Listing.deleteOne({
      _id: req.params.listId
    }, function(err, listing) {
      if (err)
        res.send(err);
      res.json({ message: 'listing successfully deleted' });
    });
  };
