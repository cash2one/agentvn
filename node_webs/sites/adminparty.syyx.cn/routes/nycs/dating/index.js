//-----------------------------------------------------------------------------------------------
var db = require("./db")
//-----------------------------------------------------------------------------------------------
exports.get_image_list = function(req, res) {
	var type = req.body.type 
	console.log(type)

	if(!type || type == "all") {
		var selector = {}
	}
	else {
		var selector = { checked : type}
	}

	db.find(selector,function(err, result) {
		if(err) {
			console.log(err)
			return
		}
		
		res.send(result)
	})
}
//-----------------------------------------------------------------------------------------------
exports.action = function(req, res) {
	var id     = req.body.id
	var action = req.body.action

	console.log(id, action)

	if(action == "delete") {
		db.remove(id, function(err) {
			if(err) {
				console.log(err)
				res.send("1")
				return
			}

			res.send("0")
		})
		return 
	}

	var doc = { checked : "checked", passed : action}

	db.update(id, doc, function(err) {
		if(err) {
			console.log(err)
			res.send("1")
			return
		}

		res.send("0")
	})
}
//-----------------------------------------------------------------------------------------------

// var data = [
// 		{ src : "http://r.syyx.com/party/nycs/dating/upload/1.jpg"}, 
// 		{ src : "http://r.syyx.com/party/nycs/dating/upload/2.jpg"}, 
// 		{ src : "http://r.syyx.com/party/nycs/dating/upload/3.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/4.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/5.jpg"}, 
// 		{   src : "http://r.syyx.com/party/nycs/dating/upload/6.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/7.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/8.jpg"}, 
// 		{   src : "http://r.syyx.com/party/nycs/dating/upload/9.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/10.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/11.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/12.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/13.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/14.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/15.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/16.jpg"}, 
// 		{   src : "http://r.syyx.com/party/nycs/dating/upload/17.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/18.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/19.jpg"}, 
// 		{   src : "http://r.syyx.com/party/nycs/dating/upload/20.jpg"}, 
// 		{     src : "http://r.syyx.com/party/nycs/dating/upload/21.jpg"}, 
// 		{    src : "http://r.syyx.com/party/nycs/dating/upload/22.jpg"}, 
// ]

// for(var i in data) {
// 	data[i].tel 	 = "13429813210"
// 	data[i].date     = new Date()
// 	data[i].passed   = "reject"
// 	data[i].checked  = false
// 	data[i].nickname = "lala"

// 	db.insert(data[i])
// }	