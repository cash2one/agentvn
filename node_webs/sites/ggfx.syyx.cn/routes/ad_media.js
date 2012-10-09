//--------------------------------------------------------------------------------------------------------
// ad_media_list.js
//--------------------------------------------------------------------------------------------------------
var admedia = require("../model/ad_media.js")

exports.action = function(req, res) {
	var classid = req.body.ClassID

	admedia.get_list(classid, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.getpagelist = function(req, res) {
	var classid = req.body.ClassID
	var medianame = req.body.MediaName
	var isenabled = req.body.IsEnabled
	var isshow = req.body.IsShow
	var pageindex = req.body.PageIndex
	var pagesize = req.body.PageSize

	if(!medianame) medianame=' '

	admedia.get_page(classid,medianame,isenabled, isshow, pageindex, pagesize, function(err, counts, rows){
		res.send({ "total": counts ,"rows" : rows })  
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.getrecord = function(req, res) {
	var id =  req.body.ID 
	admedia.get_record(id, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.addrecord = function(req, res) {
	var classid =  req.body.ClassID 
	var medianame =  req.body.MediaName 
	var mediaremark =  req.body.MediaRemark 
	var isenabled = req.body.IsEnabled
    var isshow = req.body.IsShow
	var adduserid =  req.body.AddUserId 

	admedia.add_record(classid, medianame, mediaremark, isenabled, isshow, adduserid, function(result){
		res.send({ retcode : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.deleterecord = function(req, res) {
	var id =  req.body.ID 

	admedia.delete_record(id, function(result){
		res.send({ retcode : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.updaterecord = function(req, res) {
	var id =  req.body.ID 
	var classid =  req.body.ClassID 
	var medianame =  req.body.MediaName 
	var mediaremark =  req.body.MediaRemark 
	var isenabled = req.body.IsEnabled
    var isshow = req.body.IsShow

	admedia.update_record(id, classid, medianame, mediaremark, isenabled, isshow, function(result){
		res.send({ retcode : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------