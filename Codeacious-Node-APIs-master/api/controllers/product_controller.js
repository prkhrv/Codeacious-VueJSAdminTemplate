'use strict';


// Models
var mongoose = require('mongoose'),
  Products = mongoose.model('sel_Product');


//PROFILE PIC


// var profile_pic = require('../../product/profile_pic');


//Product_Controllers

exports.list_all_products = function(req, res) {
    Products.find({}, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  };

exports.create_a_product = function(req, res,) {
    var new_product = new Products(req.body);
    new_product.save(function(err, product) {
      if (err)
        res.send(err);
      
      res.json(product);

      // var options = {
      //   url: req.body.profile_pic,
      //   dest: './product/images/'
      // }
      // profile_pic.downloadIMG(options);
    });


  };

exports.read_a_product = function(req, res) {
    Products.findById(req.params.prodId, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  };

exports.update_a_product = function(req, res) {
    Products.findOneAndUpdate({_id: req.params.prodId}, req.body, {new: true}, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  };

exports.delete_a_product = function(req, res) {
  Products.deleteOne({
      _id: req.params.prodId
    }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'product successfully deleted' });
    });
  };
