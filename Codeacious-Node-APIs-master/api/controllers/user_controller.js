'use strict';


var mongoose = require('mongoose'),
  Users = mongoose.model('sel_User');


//PROFILE PIC


var profile_pic = require('../../user/profile_pic');




exports.list_all_users = function(req, res) {
    Users.find({}, function(err, site) {
      if (err)
        res.send(err);
      res.json(site);
    });
  };

exports.create_a_user = function(req, res,) {
    var new_site = new Users(req.body);
    new_site.save(function(err, site) {
      if (err)
        res.send(err);
      res.json(site);

      var options = {
        url: req.body.profile_pic,
        dest: './user/images/'
      }
      profile_pic.downloadIMG(options);
    });


  };

exports.read_a_user = function(req, res) {
    Users.findById(req.params.userId, function(err, site) {
      if (err)
        res.send(err);
      res.json(site);
    });
  };

exports.update_a_user = function(req, res) {
    Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true, runValidators:true}, function(err, site) {
      if (err)
        res.send(err);
      res.json(site);
    });
  };

exports.delete_a_user = function(req, res) {
  Users.deleteOne({
      _id: req.params.userId
    }, function(err, site) {
      if (err)
        res.send(err);
      res.json({ message: 'User successfully deleted' });
    });
  };
