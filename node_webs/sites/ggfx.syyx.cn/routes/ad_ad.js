//--------------------------------------------------------------------------------------------------------
// ad_ad_list.js
//--------------------------------------------------------------------------------------------------------
var adad = require("../model/ad_ad.js")

exports.action = function(req, res) {
	//var gameid = req.body.GameID
	var mediaid = req.body.MediaID

	adad.get_list(mediaid, function(err, result){		
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------
exports.getpagelist = function(req, res) {
	var gameid = req.body.GameID
	var mediaid = req.body.MediaID
	var pageindex = req.body.PageIndex
	var pagesize = req.body.PageSize

	adad.get_page(gameid, mediaid, pageindex, pagesize, function(err, counts, result){
		res.send({ "total": counts ,"rows" : result })   	
	})    
}
//--------------------------------------------------------------------------------------------------------
exports.getrecord = function(req, res) {
	var id = req.body.ID

	adad.get_record(id, function(err, rows){    	
    	res.send({ "rows" : rows })  
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.addrecord = function(req, res) {
	var id =  req.body.ID 
	var gameid =  req.body.GameID 
	var adname =  req.body.ADName 
	var begintime =  req.body.BeginTime 
	var endtime =  req.body.EndTime 
	var adplace =  req.body.ADPlace 
	var adremark =  req.body.ADRemark 
	var adendurl =  req.body.ADEndUrl 
	var isdelete =  req.body.IsDelete 
	var isshow = req.body.IsShow
	var adduserid =  req.body.AddUserId 
	var orderby =  req.body.OrderBy 
	var groupid =  req.body.GroupID 
	var typeid =  req.body.TypeID 

	if(id == 0){
		adad.add_record(gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, adduserid, orderby, groupid, typeid, function(result){
			res.send({ retcode : result })    	
		})   
	}		
	else{
		adad.update_record(id, gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, orderby, groupid, typeid, function(result){
			res.send({ retcode : result })    	
		})   
	}
}
//--------------------------------------------------------------------------------------------------------
