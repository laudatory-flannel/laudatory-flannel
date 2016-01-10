var bodyparser = require('body-parser');
var helpers = require('./controllers/helpers.js');
var jwt = require('jwt-simple');
var ObjectId = require('mongoose').Types.ObjectId; 


module.exports = function(app, express) {
	app.use(bodyparser.json());
	app.use(express.static(__dirname + '/../client'));
// Get requests
	// Get events
	app.get('/events', function(req, res){
		helpers.getActiveEvents(function(err, data){
			if (err) {
				res.send(500);
			} else {
				res.json(data);
			}
		});
	});

	// Get users
	app.get('/users', function(req, res){
		helpers.getUsers(function(err, data){
			if (err) {
				res.send(500);
			} else {
				res.json(data);
			}
		});
	});

	// Get event by id
	app.get('/events/:id', function(req, res){
		helpers.getEventById(req.params.id, function(err, data) {
			if (err) {
				res.send(500);
			} else {
				res.json(data);
			}
		});
	});

	// // Get users' friends array
	// app.get('/users/:id/friends', function(req, res){
	// 	helpers.getUserById(req.params.id, function(err, data) {
	// 		if (err) {
	// 			res.send(500);
	// 		} else {
	// 			res.json(data.friends);
	// 		}
	// 	})
	// });

	// Get users' friends array
	app.get('/users/:name/friends', function(req, res){
		helpers.getUserByName(req.params.name, function(err, data) {
			if (err) {
				res.send(500);
			} else {
				res.json(data.friends);
			}
		})
	});

// Post requests
	//Posting new event
	app.post('/auth', function(req, res){
		// if logged in with facebook
		//create token
		var user = req.body;
		var token = jwt.encode(user, 'candyvan');
		helpers.getUserByName(user.name, function(err, result){
			if(result === null || result.length === 0){
				helpers.addUserToDb(user, function(err, result){
					if(err){
						res.send(500);
					} else {
						res.json({token: 'token'});
					}
				});
			} else {
				res.json({token: 'token'});
			}
		});
		// else redirect
	});

	//Add new friend to user's friends.
	// app.post('/users/:id/friends', function(req, res) {
	// 	helpers.updateUserFriends(req.params.id, req.body, '$push', function (err, data) {
	// 		if (err) {
	// 			res.send(500);
	// 		} else {
	// 			res.json(data);
	// 		}
	// 	});
	// });

	app.post('/users/:name/friends', function(req, res) {
		console.log('updating friend', req.params.name, req.body)
		helpers.updateUserFriends({name: req.params.name}, req.body, '$push', function (err, data) {
			if (err) {
				res.send(500);
			} else {
				res.json(data);
			}
		});
	});

	//Logging in/authentication
	app.post('/events', function(req, res){
		//AUTHENTICATION HERE
		//if auth
		helpers.addEventToDb(req.body, function(err, result) {
			if (err) {
				res.send(500);
			} else {
				res.json(result);
			}
		});
	});

};























