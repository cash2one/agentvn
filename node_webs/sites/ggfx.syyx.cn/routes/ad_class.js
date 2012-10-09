//--------------------------------------------------------------------------------------------------------
// adclass_list.js
//--------------------------------------------------------------------------------------------------------
var adclass = require("../model/ad_class.js")

exports.action = function(req, res) {
    adclass.get_list(function(err, rows){   	
    	res.send({"rows" : rows })  
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.getpagelist = function(req, res) {
	var pageindex = req.body.PageIndex
	var pagesize = req.body.PageSize

    adclass.get_page(pageindex, pagesize, function(err, counts, rows){   	
    	res.send({ "total": counts ,"rows" : rows })  
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.getrecord = function(req, res) {
	var id = req.body.ID    
    adclass.get_record(id, function(err, rows){    	
    	res.send({ "rows" : rows })  
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.addrecord = function(req, res) {
    var className = req.body.ClassName    
    var remark = req.body.Remark    
    var isEnabled = req.body.IsEnabled
    var isShow = req.body.IsShow

    //check account is empty or null
    if(!className){       
        console.error('className is empty')
        res.send({ "retcode" : 2 })
        return
    }  

    adclass.check_exists(className, function(isexists){
    	//已经存在
    	if(isexists>0){
    		res.send({ "retcode" : 3 })	
    		return
    	}

    	adclass.add_record(className, remark, isEnabled, isShow, function(result){
	    	res.send({ "retcode" : result })    	
	    })    
    })    
}
//--------------------------------------------------------------------------------------------------------
exports.updaterecord = function(req, res) {
    var id = req.body.ID
    var className = req.body.ClassName    
    var remark = req.body.Remark    
    var isEnabled = req.body.IsEnabled
    var isShow = req.body.IsShow

    //check account is empty or null
    if(!className){       
        console.error('className is empty')
        res.send({ "retcode" : 2 })
        return
    }  

    adclass.update_record(id, className, remark, isEnabled, isShow, function(result){
        res.send({ "retcode" : result })      
    }) 
}
//--------------------------------------------------------------------------------------------------------