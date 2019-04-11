'use strict';


var mongoose = require('mongoose'),
  Inventories = mongoose.model('sel_Inventory')






exports.list_all_inventories = function(req, res) {
    Inventories.find({}, function(err, inventory) {
      if (err)
        res.send(err);
      res.json(inventory);
    });
  };

exports.create_a_inventory = function(req, res,) {
    var new_inventory = new Inventories(req.body);
    new_inventory.save(function(err, inventory) {
      if (err)
        res.send(err);
      res.json(inventory);
    });


  };

exports.read_a_inventory = function(req, res) {
    Inventories.findById(req.params.inventoryId, function(err, inventory) {
      if (err)
        res.send(err);
      res.json(inventory);
    });
  };

exports.update_a_inventory = function(req, res) {
    Inventories.findOneAndUpdate({_id: req.params.inventoryId}, req.body, {new: true}, function(err, inventory) {
      if (err)
        res.send(err);
      res.json(inventory);
    });
  };

exports.delete_a_inventory = function(req, res) {
  Inventories.findOneAndDelete(
    {
      _id: req.params.inventoryId
    },
    // Product.remove({_id: { $pull: req.body.stock }}),
    function(err, inventory) {
      if (err)
        res.send(err);
      res.json({ message: 'inventory successfully deleted' });
    });
  };
